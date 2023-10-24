import { Request, Response } from "express";
import { db } from "../../../db";
import { prestacaoTable } from "../../prestacao/schema";
import { eq, sql } from "drizzle-orm";
import { prestacaoServicoTable } from "../schema";
import { servicoTable } from "../../servico/schema";

export async function listServicoPrestacao(request: Request, response: Response){
    const id = Number(request.params.id);

    const sqlQuery = db
        .select()
        .from(prestacaoServicoTable)
        .innerJoin(
            prestacaoTable,
            eq(
                prestacaoTable.id, prestacaoServicoTable.prestacaoId
            )
        )
        .innerJoin(
            servicoTable,
            eq(
                servicoTable.id, prestacaoServicoTable.servicoId
            )
        )
        .where(
            eq(
                prestacaoServicoTable.prestacaoId, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const result = await sqlQuery.execute({ id });
        return response.status(200).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}