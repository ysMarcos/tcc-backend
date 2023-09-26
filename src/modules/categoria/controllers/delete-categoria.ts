import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { categoriaTable } from "../schema";

export async function deleteCategoria(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .delete(categoriaTable)
        .where(
            eq(
                categoriaTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const deletedCategoria = await sqlQuery.execute({ id });
        return response.status(200).json(deletedCategoria);
    } catch(error){
        return response.status(500).json(error);
    }
}
