import { and, eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { prestacaoServicoTable } from '../schema';

export async function deleteServicoPrestacao(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const servicoId = Number(params.servicoId);

    const sqlQuery = db
        .delete(prestacaoServicoTable)
        .where(
            and(
                eq(
                    prestacaoServicoTable.id, sql.placeholder("id")
                ),
                eq(
                    prestacaoServicoTable.servicoId, sql.placeholder("servicoId")
                )
            )
        )
        .prepare();
    try {
        const result = await db.transaction(async (transaction) => {
            const result = await sqlQuery.execute({ id, servicoId });
            if(!result) transaction.rollback();
            return result;
        })
        return response.status(200).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
