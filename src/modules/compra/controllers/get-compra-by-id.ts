import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { compraTable } from "../schema";

export async function getCompraById(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .select()
        .from(compraTable)
        .where(
            eq(
                compraTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const result = await sqlQuery.execute({ id });
        return response.status(200).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
