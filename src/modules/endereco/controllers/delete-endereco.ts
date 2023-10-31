import { Request, Response } from "express";
import { enderecoTable } from "../schema";
import { db } from "../../../db";
import { sql, eq } from "drizzle-orm";

export async function deleteEndereco(request: Request, response: Response) {
    const id = Number(request.params.id);

    const sqlQuery = db
    .delete(enderecoTable)
    .where(
        eq(
            enderecoTable.id, sql.placeholder("id")
        )
    );
    try {

        const result = await sqlQuery.execute({id});

        return response.status(200).json(result);
    } catch (error) {
        return response.status(400).json(error);
    }
}
