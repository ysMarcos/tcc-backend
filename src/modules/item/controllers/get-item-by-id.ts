import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../schema";

export async function getItemById(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .select()
        .from(itemTable)
        .where(
            eq(
                itemTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const item = await sqlQuery.execute({ id });
        return response.status(200).json(item);
    } catch(error){
        return response.status(500).json(error);
    }
}
