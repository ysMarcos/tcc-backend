import { like, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { unidadeMedidaTable } from "../schema";

export async function listUnidadeMedida(request: Request, response: Response) {
    const { query } = request;
    const { nome, limit, page } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
    .select()
    .from(unidadeMedidaTable)
    .where(
        like(unidadeMedidaTable.nome, sql.placeholder("nome"))
    )
    .orderBy(
        unidadeMedidaTable.nome
    )
    .limit(limitReference)
    .offset(offset)
    .prepare();

    try {
        const unidadesDeMedida = await sqlQuery.execute({
            nome: `%${nome}%`
        });
        response.status(200).json(unidadesDeMedida);
    } catch(error){
        return response.status(500).json(error);
    }
}
