import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { pessoaTable } from "../schema";
import { pessoaEnderecoTable } from "../../pessoa-endereco/schema";
import { endereco } from "../../endereco/schema";

export async function getPessoaById(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .select()
        .from(pessoaTable)
        .leftJoin(
            pessoaEnderecoTable,
            eq(
                pessoaEnderecoTable.pessoaId, pessoaTable.id
            )
        )
        .leftJoin(
            endereco,
            eq(
                endereco.id, pessoaEnderecoTable.enderecoId
            )
        )
        .where(
            eq(
                pessoaTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const pessoa = await sqlQuery.execute({
            id
        });
        return response.status(200).json(pessoa);
    } catch (error) {
        return response.status(404).json(error)
    }
}
