import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { pessoaTable } from "../schema";

export async function deletePessoa(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .delete(pessoaTable)
        .where(
            eq(
                pessoaTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const deletedPessoa = await sqlQuery.execute({ id });
        return response.status(200).json(deletedPessoa);
    } catch(error){
        return response.status(500).json(error);
    }
}
