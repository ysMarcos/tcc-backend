import { and, like, or, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { pessoaTable } from "../schema";

export async function listPessoa(request: Request, response: Response){
    const { query } = request;
    const { nome, email, cadastro, limit, page } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
    .select()
    .from(pessoaTable)
    .where(
        or(
            like(
                pessoaTable.nome, sql.placeholder("nome")
            ),
            like(
                pessoaTable.email, sql.placeholder("email")
            ),
            like(
                pessoaTable.cadastro, sql.placeholder("cadastro")
            )
        )
    )
    .orderBy(
        pessoaTable.nome
    )
    .limit(limitReference)
    .offset(offset)
    .prepare();

    try {
        const result = await sqlQuery.execute({
            nome: `%${nome}%`,
            email: `${email}%`,
            cadastro: `%${cadastro}%`,
        })
        response.status(200).json({ result });
    } catch(error){
        return response.status(400).json(error);
    }
}
