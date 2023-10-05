import { Request, Response } from "express";
import  { sql } from "drizzle-orm"
import { db } from "../../../db";
import { unidadeMedidaTable, unidadeMedidaInsertSchema } from "../schema";

export async function createUnidadeDeMedida(request: Request, response: Response){
    const newUM = request.body;

    const sqlQuery = db
        .insert(unidadeMedidaTable)
        .values({
            nome: sql.placeholder("nome")
        })
        .prepare();

    try {
        const isValid = unidadeMedidaInsertSchema.safeParse(newUM);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const insertedItem = await sqlQuery.execute({
                nome: newUM.nome
            });
            if(!insertedItem) transaction.rollback();
            return insertedItem;
        })

        response.status(200)
            .json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
