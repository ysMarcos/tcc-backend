import { Request, Response } from "express";
import { db } from "../../../db";
import { enderecoTable } from "../schema";
import { sql, eq } from "drizzle-orm";

export async function updateEndereco(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = request.body;

    const enderecoSql = db
        .select()
        .from(enderecoTable)
        .where(
            eq(
                enderecoTable.id, sql.placeholder("id")
            )
        )
        .prepare();

    try {

        const result = await db.transaction(async (transaction) => {
            const endereco = await enderecoSql.execute({id});

            const result = await db
            .update(enderecoTable)
            .set({
                ...endereco,
                ...data
            })
            .where(
                eq(enderecoTable.id, id)
            );
            return result
        })

        response.status(200).json(result);
    } catch (error) {
        return response.status(400).json(error);
    }
}
