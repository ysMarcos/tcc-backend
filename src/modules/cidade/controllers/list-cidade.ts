import { and, like, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { cidadeTable } from "../schema";

export async function listCidade(request: Request, response: Response){
    const { query } = request;
    const { nome, limit, page } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
    .select()
    .from(cidadeTable)
    .where(
        and(
            like(cidadeTable.nome, sql.placeholder("nome")),
        )
    )
    .orderBy(
        cidadeTable.nome
    )
    .limit(limitReference)
    .offset(offset)
    .prepare();

    try {
        const cidades = await sqlQuery.execute({
            nome: `%${nome}%`
        });
        response.status(200).json(cidades);
    } catch(error){
        return response.status(500).json(error);
    }
}
