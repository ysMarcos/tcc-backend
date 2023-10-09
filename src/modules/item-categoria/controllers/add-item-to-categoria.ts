import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { categoriaTable } from "../../categoria/schema";
import { itemTable } from "../../item/schema";
import { itemCategoriaTable } from "../schema";

export async function addItemToCategoria (request: Request, response: Response) {
    const { params } = request;
    const itemId = Number(params.itemId);
    const categoriaId = Number(request.body.categoriaId);

    const itemSqlQuery  = db
        .select()
        .from(itemTable)
        .where(
            eq(
                itemTable.id, sql.placeholder("itemId")
            )
        )
        .prepare();
    const categoriaSqlQuery  = db
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
                return;
            }
            const [categoria] = await categoriaSqlQuery.execute({categoriaId});
            if (!categoria){
                transaction.rollback();
                return;
            }
            const itemCategoria = await db
            .insert(itemCategoriaTable)
            .values({
                itemId,
                categoriaId
            });
            return itemCategoria;
        });
        return response.status(200).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
