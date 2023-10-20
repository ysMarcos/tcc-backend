import { isCPFOrCNPJ } from "brazilian-values";
import { eq, or, sql } from "drizzle-orm";
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

    const sqlVerify = db
    .select({
        id: pessoaTable.id
    })
    .from(pessoaTable)
    .where(
        or(
            eq(
                pessoaTable.email,  sql.placeholder("email")
            ),
            eq(
                pessoaTable.cadastro, sql.placeholder("cadastro")
            ),
            eq(
                pessoaTable.registro, sql.placeholder("registro")
            )
        )

    )
    .prepare()

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

    const returnSql = db
    .select({
        id: pessoaTable.id
    })
    .from(pessoaTable)
    .where(
        eq(pessoaTable.id, sql.placeholder("insertId"))
        )
    .prepare();

    try {

        const isValid = pessoaInsertSchema.safeParse({
            nome,
            email,
            telefone,
            cadastro,
            registro,
        });
        if(!isValid.success) return response.status(400).json(isValid.error.issues);

        const validCadastro = isCPFOrCNPJ(cadastro);
        if(!validCadastro) return response.status(400).json({ message: "Cadastros is Invalid" });

        const [pessoa] = await sqlVerify.execute({
            email,
            cadastro,
            registro
        })
        if(pessoa) return response.status(400).json({ message: "Pessoa already exists" })
        const result = await db.transaction(async (transaction) => {
            const [insertPessoa] = await sqlQuery.execute({
                nome,
                email,
                telefone,
                cadastro,
                registro
            })
            if(!insertPessoa) transaction.rollback();

            const result = await returnSql.execute({
                insertId: insertPessoa.insertId
            })
            return result;
        })
        return response.status(201).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
