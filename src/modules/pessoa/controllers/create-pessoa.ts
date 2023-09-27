import { sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { pessoaInsertSchema, pessoaTable } from "../schema";

export async function createPessoa(request: Request, response: Response){
    const {
        nome,
        email,
        telefone,
        cadastro,
        registro
    } = request.body;

    const isValid = pessoaInsertSchema.safeParse({
        nome,
        email,
        telefone,
        cadastro,
        registro,
    });
    if(!isValid.success) return response.status(400).json(isValid.error.issues);

    const sqlQuery = db
    .insert(pessoaTable)
    .values({
        nome: sql.placeholder("nome"),
        email: sql.placeholder("email"),
        telefone: sql.placeholder("telefone"),
        cadastro: sql.placeholder("cadastro"),
        registro: sql.placeholder("registro")
    })
    .prepare();

    try {
        const result = await db.transaction(async (transaction) => {
            const insertedPessoa = await sqlQuery.execute({
                nome,
                email,
                telefone,
                cadastro,
                registro
            })
            if(!insertedPessoa) transaction.rollback();
            return insertedPessoa;
        })
        return response.status(201).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
