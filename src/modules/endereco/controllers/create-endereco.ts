import { Request, Response } from "express";
import { db } from "../../../db";
import { enderecoTable, enderecoInsertSchema } from "../schema";
import { sql } from "drizzle-orm";

export async function createEndereco(request: Request, response: Response) {
    const data = request.body;
    const cidadeId = Number(data.cidadeId);

    const sqlQuery = db
            .insert(enderecoTable)
            .values({
                rua: sql.placeholder("rua"),
                numero: sql.placeholder("numero"),
                bairro: sql.placeholder("bairro"),
                cep: sql.placeholder("cep"),
                cidadeId: sql.placeholder("cidadeId"),
                complemento: sql.placeholder("complemento"),
                tipo: sql.placeholder("tipo")
            })
            .prepare();
    try {

        const isValid = enderecoInsertSchema.safeParse(data);
        if(!isValid.success) return response.status(400).json(isValid.error.issues[0].message);

        const result = await sqlQuery.execute({
            rua: data.rua,
            numero: data.numero,
            bairro: data.bairro,
            cep: data.cep,
            cidadeId: cidadeId,
            complemento: data.complemento,
            tipo: data.tipo
        });

        return response.status(201).json(result);
    } catch (error) {
        return response.status(400).json(error);
    }
};
