import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { unidadeMedidaTable } from "../schema";

export async function deleteUnidadeMedida(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .delete(unidadeMedidaTable)
        .where(
            eq(
                unidadeMedidaTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const deletedUnidadeMedida = await sqlQuery.execute({ id });
        return response.status(200).json(deletedUnidadeMedida);
    } catch(error){
        return response.status(500).json(error);
    }
}
