import { sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { cidadeInsertSchema, cidadeTable } from "../schema";

export async function createCidade(request: Request, response: Response){
    const newCidadeData = request.body;

    const sqlQuery = db
        .insert(cidadeTable)
        .values({
            nome: sql.placeholder("nome")
        })
        .prepare();

    try {
        const isValid = cidadeInsertSchema.safeParse(newCidadeData);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const insertedcidade = sqlQuery.execute({
                nome: newCidadeData.nome
            });
            if(!insertedcidade) transaction.rollback();
            return insertedcidade;
        })

        response.status(200).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
