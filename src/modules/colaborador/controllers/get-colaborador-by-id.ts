import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { colaboradorTable } from "../schema";

export async function getColaboradorById(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .select({
            id: colaboradorTable.id,
            user: colaboradorTable.usuario,
            dataInicio: colaboradorTable.dataInicio,
            dataFim: colaboradorTable.dataPrevisaoFim,
            pessoaId: colaboradorTable.pessoaId,
            ativo: colaboradorTable.ativo
        })
        .from(colaboradorTable)
        .where(
            eq(
                colaboradorTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const result = await sqlQuery.execute({ id });
        return response.status(200).json(result);
    } catch (error) {
        return response.status(404).json(error)
    }
}
