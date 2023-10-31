import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import { db } from "../../../db";
import { pessoaTable } from "../schema";
import { pessoaEnderecoTable } from "../../pessoa-endereco/schema";
import { enderecoTable } from "../../endereco/schema";
import { cidadeTable } from "../../cidade/schema";

export async function getPessoaById(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .select()
        .from(pessoaTable)
        .where(
            eq(
                pessoaTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    const enderecoSqlQuery = db
        .select({
            rua: enderecoTable.rua,
            numero: enderecoTable.numero,
            bairro: enderecoTable.bairro,
            cep: enderecoTable.cep,
            tipo: enderecoTable.tipo,
            complemento: enderecoTable.complemento,
            cidade: cidadeTable.nome
        })
        .from(pessoaEnderecoTable)
        .leftJoin(
            enderecoTable,
            eq(
                pessoaEnderecoTable.enderecoId, enderecoTable.id
            )
        )
        .leftJoin(
            cidadeTable,
            eq(
                cidadeTable.id, enderecoTable.cidadeId
            )
        )
        .where(
            eq(
                pessoaEnderecoTable.pessoaId, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const pessoa = await sqlQuery.execute({
            id
        });
        const pessoaEndereco = await enderecoSqlQuery.execute({
            id
        })
        return response.status(200).json({
            data: {
                pessoa,
                pessoaEndereco
            }
        });
    } catch (error) {
        return response.status(404).json(error)
    }
}
