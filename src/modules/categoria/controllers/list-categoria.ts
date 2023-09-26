import { and, like, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { categoriaTable } from "../schema";

export async function listCategoria(request: Request, response: Response){
    const { query } = request;
    const { nome, limit, page } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
    .select()
    .from(categoriaTable)
    .where(
        and(
            like(categoriaTable.nome, sql.placeholder("nome")),
        )
    )
    .orderBy(
        categoriaTable.nome
    )
    .limit(limitReference)
    .offset(offset)
    .prepare();

    try {
        const categorias = await sqlQuery.execute({
            nome: `%${nome}%`
        });
        response.status(200).json(categorias);
    } catch(error){
        return response.status(500).json(error);
    }
}
