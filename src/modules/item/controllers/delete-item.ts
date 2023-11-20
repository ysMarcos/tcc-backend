import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../schema";
import { itemCategoriaTable } from "../../item-categoria/schema";

export async function deleteItem(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .delete(itemTable)
        .where(
            eq(
                itemTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const result = await db.transaction(async (transaction) => {
            const [deleteItemCategoria] = await db
            .delete(itemCategoriaTable)
            .where(eq(
                itemCategoriaTable.itemId, id
            ))
            if(!deleteItemCategoria) transaction.rollback();
            const [result] = await sqlQuery.execute({ id });
            return result;
        })
        return response.status(200).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
