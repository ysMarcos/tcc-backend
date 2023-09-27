import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { cidadeTable } from "../schema";

export async function getCidadeById(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .select()
        .from(cidadeTable)
        .where(
            eq(
                cidadeTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const cidade = await sqlQuery.execute({ id });
        return response.status(200).json(cidade);
    } catch(error){
        return response.status(500).json(error);
    }
}
