import { Request, Response } from "express";
import { enderecoTable } from "../schema";
import { db } from "../../../db";
import { sql, eq } from "drizzle-orm";
import { pessoaEnderecoTable } from "../../pessoa-endereco/schema";

export async function getEnderecoByPessoaId(request: Request, response: Response) {
    const pessoaId = Number(request.params.pessoaId);
    const sqlQuery = db
        .select({
            id: enderecoTable.id,
            rua: enderecoTable.rua,
            numero: enderecoTable.numero,
            cep: enderecoTable.cep,
            tipo: enderecoTable.tipo,
            cidade: enderecoTable.cidade
        })
        .from(pessoaEnderecoTable)
        .innerJoin(
            enderecoTable,
            eq(
                enderecoTable.id, pessoaEnderecoTable.enderecoId
            )
        )
        .where(
            eq(
                pessoaEnderecoTable.pessoaId, sql.placeholder("pessoaId")
            )
        )
        .prepare();
    try {

        const selectEndereco = await sqlQuery.execute({pessoaId});

        response.status(200).json(selectEndereco);
    } catch (error) {
        response.status(400).json(error);
    }
}
