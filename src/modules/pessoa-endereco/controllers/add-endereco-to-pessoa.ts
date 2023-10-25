import { Request, Response } from "express";
import { db } from "../../../db";
import { pessoaEndereco } from "../schema";
import { sql } from "drizzle-orm";

export async function addEnderecoToPessoa(request: Request, response: Response) {
    const { body, params } = request;
    const pessoaId = Number(params.pessoaId);
    const enderecoId = Number(body.enderecoId);

    const sqlQuery = db
        .insert(pessoaEndereco)
        .values({
            pessoaId: sql.placeholder("pessoaId"),
            enderecoId: sql.placeholder("enderecoId")
        })
        .prepare();
    try {
        const result = await db.transaction( async (transaction) => {
            const result = await sqlQuery.execute({
                pessoaId,
                enderecoId
            })
            if(!result){
                transaction.rollback();
            }
            return result;
        })
        return response.status(200).json(result);
    } catch (error) {
        return response.status(400).json(error)
    }
}
