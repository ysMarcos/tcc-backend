import { Request, Response } from "express";
import  { sql } from "drizzle-orm"
import { db } from "../../../db";
import { itemInsertSchema, itemTable } from "../schema";

export async function insertItemTest(request: Request, response: Response){
    const newItemData = request.body;

    const sqlQuery = db
        .insert(itemTable)
        .values({
            nome: sql.placeholder("nome"),
            valorUnitario: sql.placeholder("valorUnitario"),
            descricao: sql.placeholder("descricao"),
            unidadeMedidaId: sql.placeholder("unidadeMedidaId")
        })
        .prepare();

    try {
        const isValid = itemInsertSchema.safeParse(newItemData);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const insertedItem = sqlQuery.execute({
                nome: newItemData.nome,
                valorUnitario: newItemData.valorUnitario,
                descricao: newItemData.descricao,
                unidadeMedidaId: newItemData.unidadeMedidaId,
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
