import { sql, eq, and } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { prestacaoServicoTable } from "../schema";
//TODO: adicionar validadores
export async function addServicoToPrestacao (request: Request, response: Response) {
    const { params, body } = request;
    const prestacaoId = Number(params.id);
    const data = body;

    try {
        const result = await db.transaction( async (transaction) => {
            const result = await db
                    .insert(prestacaoServicoTable)
                    .values({
                        dataInicio: data.dataInicio,
                        dataFim: data.dataFim,
                        valorCobrado: data.valorCobrado,
                        prestacaoId,
                        servicoId: data.servicoId
                    });
            if(!result){
                transaction.rollback();
            }
            return result;
        });
        return response.status(200).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
