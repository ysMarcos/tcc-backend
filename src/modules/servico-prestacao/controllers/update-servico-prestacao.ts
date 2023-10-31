import { and, eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { prestacaoServicoTable } from '../schema';

export async function updateServicoPrestacao(request: Request, response: Response){
    const data = request.body;
    const id = Number(request.params.id);
    const servicoId = Number(request.params.servicoId);

    const newDataInicio = new Date(data.dataInicio);
    const newDataFim = new Date(data.dataFim);

    const newData = {
        valorCobrado: data.valorCobrado,
        dataInicio: newDataInicio,
        dataFim: newDataFim,
        isPago: data.isPago
    }

    const sqlQuery = db
        .select()
        .from(prestacaoServicoTable)
        .where(
            and(
                eq(
                    prestacaoServicoTable.prestacaoId, sql.placeholder("id")
                ),
                eq(
                    prestacaoServicoTable.servicoId, sql.placeholder("servicoId")
                )
            )
        )
        .prepare();

    try {
        const result = await db.transaction(async (transaction) => {
            const [servico] = await sqlQuery.execute({ id, servicoId });
            if(!servico){
                transaction.rollback();
            }
            const result = await db
                .update(prestacaoServicoTable)
                .set({
                    ...servico,
                    ...newData
                })
                .where(
                    and(
                        eq(
                            prestacaoServicoTable.prestacaoId, id
                        ),
                        eq(
                            prestacaoServicoTable.servicoId, servicoId
                        )
                ))
            return result;
        })
        return response.status(200).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
