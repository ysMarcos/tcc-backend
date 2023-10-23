import { sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { servicoTable } from "../schema";

export async function createServico(request: Request, response: Response){
    const data = request.body;

    const sqlQuery = db
        .insert(servicoTable)
        .values({
            nome: sql.placeholder("nome")
        })
        .prepare();

    try {

        const result = await db.transaction(async (transaction) => {
            const result = sqlQuery.execute({
                nome: data.nome
            });
            if(!result) transaction.rollback();
            return result;
        })
        response.status(201).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
