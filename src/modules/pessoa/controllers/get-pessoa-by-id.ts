import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { pessoaTable } from "../schema";

export async function getPessoaById(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .select()
        .from(pessoaTable)
        .where(
            eq(
                pessoaTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const pessoa = await sqlQuery.execute({
            id
        });
        return response.status(200).json(pessoa);
    } catch (error) {
        return response.status(404).json(error)
    }
}
