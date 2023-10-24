import { and, eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { categoriaTable } from "../../categoria/schema";
import { itemTable } from "../../item/schema";
import { itemCategoriaTable } from "../schema";

export async function removeItemFromCategoria(request: Request, response: Response) {
    const data = request.body
    const itemId = Number(data.itemId);
    const categoriaId = Number(data.categoriaId);
    console.log(data)
    const itemSqlQuery = db
        .select()
        .from(itemTable)
        .where(
            eq(
                itemTable.id, sql.placeholder("itemId")
            )
        )
        .prepare();
    const categoriaSqlQuery = db
        .select()
        .from(categoriaTable)
        .where(
            eq(
                categoriaTable.id, sql.placeholder("categoriaId")
            )
        )
        .prepare();

    try {

        const result = await db.transaction( async (transaction) => {
            const [item] = await itemSqlQuery.execute({itemId});
            if (!item){
                transaction.rollback();
            }
            const [categoria] = await categoriaSqlQuery.execute({categoriaId});
            if (!categoria){
                transaction.rollback();
            }
            const result = await db
            .delete(itemCategoriaTable)
            .where(
                and(
                    eq(itemCategoriaTable.itemId, itemId),
                    eq(itemCategoriaTable.categoriaId, categoriaId)
                )
            )
            return result;
        })

        return response.status(200).json(result);
    } catch (error) {
        return response.status(400).json(error);
    }
}
