import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { colaboradorTable } from "../schema";

export async function getColaboradorById(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .select()
        .from(colaboradorTable)
        .where(
            eq(
                colaboradorTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const colaborador = await sqlQuery.execute({
            id
        });
        return response.status(200).json(colaborador);
    } catch (error) {
        return response.status(404).json(error)
    }
}
