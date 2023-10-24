import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { categoriaTable } from "../../categoria/schema";
import { itemTable } from "../../item/schema";
import { itemCategoriaTable } from "../schema";
export async function addItemToCategoria (request: Request, response: Response) {
    const { data } = request.body;

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
        for( const icData of data){
            await db.transaction( async (transaction) => {
                const [item] = await itemSqlQuery.execute({itemId: icData.itemId});
                if (!item){
                    transaction.rollback();
                    return;
                }
                const [categoria] = await categoriaSqlQuery.execute({categoriaId: icData.categoriaId});
                if (!categoria){
                    transaction.rollback();
                    return;
                }
                const result = await db
                .insert(itemCategoriaTable)
                .values({
                    itemId: icData.itemId,
                    categoriaId: icData.categoriaId
                });
                return result;
            });
        }


        return response.status(200).json({ message: "Success" });
    } catch(error){
        return response.status(400).json(error);
    }
}
