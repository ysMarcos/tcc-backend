import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { colaboradorTable } from "../schema";

export async function deleteColaborador(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .delete(colaboradorTable)
        .where(
            eq(
                colaboradorTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const deletedColaborador = await sqlQuery.execute({ id });
        return response.status(200).json(deletedColaborador);
    } catch(error){
        return response.status(500).json(error);
    }
}
