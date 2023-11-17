import { Request, Response } from "express";
import { db } from "../../../db";
import { enderecoTable, enderecoInsertSchema } from "../schema";
import { sql } from "drizzle-orm";
import { pessoaEnderecoTable } from "../../pessoa-endereco/schema";

export async function createEndereco(request: Request, response: Response) {
    const data = request.body;
    const pessoaId = Number(request.params.pessoaId);

    const sqlQuery = db
            .insert(enderecoTable)
            .values({
                rua: sql.placeholder("rua"),
                numero: sql.placeholder("numero"),
                bairro: sql.placeholder("bairro"),
                cep: sql.placeholder("cep"),
                cidade: sql.placeholder("cidade"),
                complemento: sql.placeholder("complemento"),
                tipo: sql.placeholder("tipo")
            })
            .prepare();
    try {

        const isValid = enderecoInsertSchema.safeParse(data);
        if(!isValid.success) return response.status(400).json(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [endereco] = await sqlQuery.execute({
                rua: data.rua,
                numero: data.numero,
                bairro: data.bairro,
                cep: data.cep,
                cidade: data.cidade,
                complemento: data.complemento,
                tipo: data.tipo
            });
            if(!endereco) transaction.rollback();

            const result = await db
                .insert(pessoaEnderecoTable)
                .values({
                    enderecoId: endereco.insertId,
                    pessoaId: pessoaId
                })

            return result;
        })

        return response.status(201).json(result);
    } catch (error) {
        return response.status(400).json(error);
    }
};
