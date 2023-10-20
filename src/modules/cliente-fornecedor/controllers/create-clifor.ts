import { eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { pessoaTable } from '../../pessoa/schema';
import { clienteFornecedorTable, clienteFornecedorInsertSchema } from '../schema';

export async function createClienteFornecedor(request: Request, response: Response){
    const {
        pessoaId,
        isCliente
    } = request.body;

    const cliforExistsQuery = db
        .select({
            id: clienteFornecedorTable.id
        })
        .from(clienteFornecedorTable)
        .where(
            eq(
                clienteFornecedorTable.pessoaId, sql.placeholder("pessoaId")
            )
        )
        .prepare();

    const sqlQuery = db
        .insert(clienteFornecedorTable)
        .values({
            pessoaId: sql.placeholder("pessoaId"),
            isCliente: sql.placeholder("isCliente")
        })
        .prepare();

    const resultSql = db
        .select()
        .from(clienteFornecedorTable)
        .where(
            eq(
                clienteFornecedorTable.id, sql.placeholder("insertId")
            )
        )
        .prepare();
    try {
        const isValid = clienteFornecedorInsertSchema.safeParse({
            isCliente
        });
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [cliforExists] = await cliforExistsQuery.execute({
                pessoaId
            });

            if(cliforExists){
                transaction.rollback();
                return;
            }

            const [insertClifor] = await sqlQuery.execute({
                pessoaId,
                isCliente
            });

            if(!insertClifor){
                transaction.rollback();
            }
            const result = await resultSql.execute({
                insertId: insertClifor.insertId
            })
            return result;
        });

        return response.status(201).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
