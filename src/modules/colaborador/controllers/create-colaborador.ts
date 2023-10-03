import { sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { hashSenha } from "../helpers/encrypt";
import { colaboradorInsertSchema, colaboradorTable } from "../schema";

export async function createColaborador(request: Request, response: Response){
    const {
        usuario,
        senha,
        dataInicio,
        dataPrevisaoFim,
        pessoaId,
    } = request.body;
    const hashedPassword = await hashSenha(senha);

    const sqlQuery = db
        .insert(colaboradorTable)
        .values({
            usuario: sql.placeholder("usuario"),
            senha: sql.placeholder("senha"),
            dataInicio: sql.placeholder("dataInicio"),
            dataPrevisaoFim: sql.placeholder("dataPrevisaoFim"),
            pessoaId: sql.placeholder("pessoaId"),
        })
        .prepare();

    try {
        const isValid = colaboradorInsertSchema.safeParse({
            usuario,
            senha,
            dataInicio,
            dataPrevisaoFim,
            pessoaId,
        });
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const insertedColaborador = await sqlQuery.execute({
                usuario,
                senha: hashedPassword,
                dataInicio,
                dataPrevisaoFim,
                pessoaId,
            });
            if(!insertedColaborador) transaction.rollback();
            return insertedColaborador;
        })
        if(!result) response.status(400).send({ message: "Cannot create user" })

        response.status(201)
            .json({ message: "User created successfully" });
    } catch(error){
        return response.status(500).json(error);
    }
}
