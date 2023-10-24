import { eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { clienteFornecedorTable } from '../../cliente-fornecedor/schema';
import { colaboradorTable } from '../../colaborador/schema';
import { prestacaoInsertSchema, prestacaoTable } from '../schema';

export async function createPrestacao(request: Request, response: Response){
    const data = request.body;

    const cliforId = Number(data.clienteFornecedorId);
    const colaboradorId = Number(data.colaboradorId);

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
        .insert(prestacaoTable)
        .values({
            descricao: sql.placeholder("descricao"),
            colaboradorId: sql.placeholder("colaboradorId"),
            clienteFornecedorId: sql.placeholder("clienteFornecedorId"),
            isPago: sql.placeholder("isPago")
        })
        .prepare();
    try {

        const isValid = prestacaoInsertSchema.safeParse({ data });
        if(!isValid.success) return response.status(400).json(isValid.error.issues);

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
                descricao: data.descricao,
                colaboradorId: colaboradorId,
                clienteFornecedorId: cliforId,
                isPago: data.isPago
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
