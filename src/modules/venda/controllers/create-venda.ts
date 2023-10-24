import { eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { clienteFornecedorTable } from '../../cliente-fornecedor/schema';
import { colaboradorTable } from '../../colaborador/schema';
import { vendaInsertSchema, vendaTable } from '../schema';

export async function createVenda(request: Request, response: Response){
    const data = request.body;

    const cliforId = Number(data.clienteFornecedorId);
    const colaboradorId = Number(data.colaboradorId);

    const dataVenda = new Date(data.dataVenda);

    const cliforExistsSql = db
        .select({
            id: clienteFornecedorTable.id
        })
        .from(clienteFornecedorTable)
        .where(
            eq(
                clienteFornecedorTable.id, sql.placeholder("cliforId")
            )
        )
        .prepare();
    const colaboradorExistsSql = db
        .select({
            id: colaboradorTable.id
        })
        .from(colaboradorTable)
        .where(
            eq(
                colaboradorTable.id, sql.placeholder("colaboradorId")
            )
        )
        .prepare();
    const sqlQuery = db
        .insert(vendaTable)
        .values({
            dataVenda: sql.placeholder("dataVenda"),
            colaboradorId: sql.placeholder("colaboradorId"),
            clienteFornecedorId: sql.placeholder("cliforId")
        })
    try {

        const isValid = vendaInsertSchema.safeParse({
            dataVenda,
            colaboradorId
        });
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const cliforExists = await cliforExistsSql.execute({ cliforId });
            if(!cliforExists){
                transaction.rollback();
            }
            const colaboradorExists = await colaboradorExistsSql.execute({ colaboradorId });
            if(!colaboradorExists){
                transaction.rollback();
            }
            const result = await sqlQuery.execute({
                dataVenda: data.dataVenda,
                colaboradorId,
                cliforId
            })
            if(!result){
                transaction.rollback();
            }
            return result;
        })
        return response.status(201).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
