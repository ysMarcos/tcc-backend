import { Request, Response } from "express";
import { pessoaEndereco } from "../schema";
import { db } from "../../../db";
import { and, eq, sql } from "drizzle-orm";

export async function removePessoaFromEndereco(request: Request, response: Response) {
    const { params } = request;
    const pessoaId = Number(params.pessoaId);
    const enderecoId = Number(params.enderecoId);

    const sqlQuery = db
        .delete(pessoaEndereco)
        .where(
            and(
                eq( pessoaEndereco.pessoaId, sql.placeholder("pessoaId")),
                eq( pessoaEndereco.enderecoId, sql.placeholder("enderecoId"))
            )

        )
        .prepare();
    try {
        const result = await db.transaction(async (transaction) => {
            const result = sqlQuery.execute({
                pessoaId,
                enderecoId
            })
            if(!result) {
                transaction.rollback();
            }
            return result;
        });
        return response.status(200).json(result);
    } catch (error) {
        return response.status(400).json(error);
    }
}
