import { and, eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { prestacaoServicoTable } from '../schema';

export async function updateServicoPrestacao(request: Request, response: Response){
    const data = request.body;
    const id = Number(request.params.id);

    let newDataInicio = null;
    if(data.dataInicio){
        newDataInicio = new Date(data.dataInicio)
    }
    let newDataFim = null;
    if(data.dataFim){
        newDataFim = new Date(data.dataInicio)
    }

    let newData: Record<any, any> = {};
    if(data.valorCobrado && data.valorCobrado.length > 0) newData.valorCobrado = data.valorCobrado;
    if(newDataInicio) newData.dataInicio = newDataInicio;
    if(newDataFim) newData.dataFim = data.newDataFim;
    if(data.isPago === true || data.isPago === false) newData.isPago = data.isPago;
    if(data.status === true || data.isPago === false) newData.status = data.status;

    const sqlQuery = db
        .select()
        .from(prestacaoServicoTable)
        .where(
            and(
                eq(
                    prestacaoServicoTable.id, sql.placeholder("id")
                )
            )
        )
        .prepare();

    try {
        const result = await db.transaction(async (transaction) => {
            const [servico] = await sqlQuery.execute({ id });
            if(!servico){
                transaction.rollback();
            }
            const [result] = await db
                .update(prestacaoServicoTable)
                .set({
                    ...servico,
                    ...newData
                })
                .where(
                    eq(prestacaoServicoTable.id, id)
                )
            console.log(result)
            return result;
        })
        return response.status(200).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
