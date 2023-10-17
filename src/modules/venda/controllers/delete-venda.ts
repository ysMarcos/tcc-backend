import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { vendaTable } from "../schema";

export async function deleteVenda(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .delete(vendaTable)
        .where(
            eq(
                vendaTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const deletedVenda = await sqlQuery.execute({ id });
        return response.status(200).json(deletedVenda);
    } catch(error){
        return response.status(500).json(error);
    }
}
