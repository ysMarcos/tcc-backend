import { sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { categoriaInsertSchema, categoriaTable } from "../schema";

export async function createCategoria(request: Request, response: Response){
    const newCategoriaData = request.body;

    const sqlQuery = db
        .insert(categoriaTable)
        .values({
            nome: sql.placeholder("nome")
        })
        .prepare();

    try {
        const isValid = categoriaInsertSchema.safeParse(newCategoriaData);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const insertedCategoria = sqlQuery.execute({
                nome: newCategoriaData.nome
            });
            if(!insertedCategoria) transaction.rollback();
            return insertedCategoria;
        })

        response.status(200)
            .json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
