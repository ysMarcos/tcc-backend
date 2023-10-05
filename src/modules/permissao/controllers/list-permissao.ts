import { like, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { permissaoTable } from "../schema";

export async function listPermissao(request: Request, response: Response) {
    const { query } = request;
    const { nome, limit, page } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
    .select()
    .from(permissaoTable)
    .where(
        like(permissaoTable.nome, sql.placeholder("nome"))
    )
    .orderBy(
        permissaoTable.nome
    )
    .limit(limitReference)
    .offset(offset)
    .prepare();

    try {
        const result = await sqlQuery.execute({
            nome: `%${nome}%`
        });
        response.status(200).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
