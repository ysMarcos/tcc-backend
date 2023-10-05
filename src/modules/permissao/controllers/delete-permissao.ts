import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { permissaoTable } from "../schema";

export async function deletePermissao(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .delete(permissaoTable)
        .where(
            eq(
                permissaoTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const result = await sqlQuery.execute({ id });
        return response.status(200).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
