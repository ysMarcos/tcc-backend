import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../schema";

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
        const deletedItem = await sqlQuery.execute({ id });
        return response.status(200).json(deletedItem);
    } catch(error){
        return response.status(400).json(error);
    }
}
