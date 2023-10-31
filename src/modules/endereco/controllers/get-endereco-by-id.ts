import { Request, Response } from "express";
import { enderecoTable } from "../schema";
import { db } from "../../../db";
import { sql, eq } from "drizzle-orm";

export async function getEnderecoById(request: Request, response: Response) {
    const id = Number(request.params.id);
    const sqlQuery = db
        .select()
        .from(enderecoTable)
        .where(
            eq(
                enderecoTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {

        const selectEndereco = await sqlQuery.execute({id})

        response.status(200).json(selectEndereco);
    } catch (error) {
        response.status(400).json(error);
    }
}
