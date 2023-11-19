import { Request, Response } from "express";
import { db } from "../../../db";
import { enderecoTable } from "../schema";
import { sql, eq } from "drizzle-orm";


export async function updateEndereco(request: Request, response: Response) {
    const id = Number(request.params.id);
    const data = request.body;

    let newData: Record<string, string> = {};
    if(data.rua && data.rua.length >= 3) newData.rua = data.rua;
    if(data.numero && data.numero.length > 0) newData.numero = data.numero;
    if(data.bairro && data.bairro.length >=3 ) newData.bairro = data.bairro;
    if(data.cep && data.cep.length === 8) newData.cep = data.cep;
    if(data.complemento && data.complemento.length >= 0) newData.complemento = data.complemento;
    if(data.cidade && data.cidade.length >= 0) newData.cidade = data.cidade;
    if(data.tipo && data.tipo.length) newData.tipo = data.tipo;

    const enderecoSql = db
        .select({
            rua: enderecoTable.rua,
            numero: enderecoTable.numero,
            bairro: enderecoTable.bairro,
            cep: enderecoTable.cep,
            complemento: enderecoTable.complemento,
            cidade: enderecoTable.cidade,
            tipo: enderecoTable.tipo
        })
        .from(enderecoTable)
        .where(
            eq(
                enderecoTable.id, sql.placeholder("id")
            )
        )
        .prepare();

    try {

        const result = await db.transaction(async (transaction) => {
            const [endereco] = await enderecoSql.execute({id});
            if(!endereco) transaction.rollback();

            const result = await transaction
            .update(enderecoTable)
            .set({
                ...endereco,
                ...newData
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
