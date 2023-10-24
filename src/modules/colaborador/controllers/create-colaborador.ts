import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { hashSenha } from "../helpers/encrypt";
import { colaboradorInsertSchema, colaboradorTable } from "../schema";
import { permissaoColaborador } from "../../permissao-colaborador/schema";

export async function createColaborador(request: Request, response: Response){
    const {
        usuario,
        senha,
        dataInicio,
        dataPrevisaoFim,
        pessoaId,
    } = request.body;
    const hashedPassword = await hashSenha(senha);

    const dtInicio = new Date(dataInicio);
    const dtFim = new Date(dataPrevisaoFim);
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


        if( dtInicio > dtFim) return response.status(400).send({ error: "dataInicio must be greater than dataPrevisaoFim"});

        const result = await db.transaction(async (transaction) => {
            const [result] = await sqlQuery.execute({
                usuario,
                senha: hashedPassword,
                dataInicio,
                dataPrevisaoFim,
                pessoaId,
            });
            if(!result) transaction.rollback();
            return result;
        })
        response.status(201).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}

export async function firstAccess(request: Request, response: Response){
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

    const sqlVerify = db
        .select()
        .from(colaboradorTable)
        .prepare()

    const returnSql = db
        .select({
            id: colaboradorTable.id
        })
        .from(colaboradorTable)
        .where(
            eq(
                colaboradorTable.id, sql.placeholder("insertId")
            )
        )
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

        const [colaborador] = await sqlVerify.execute();
        if(colaborador) return response.status(401)

        const result = await db.transaction(async (transaction) => {
            const [colaborador] = await sqlQuery.execute({
                usuario,
                senha: hashedPassword,
                dataInicio,
                dataPrevisaoFim,
                pessoaId,
            });
            if(!colaborador) transaction.rollback();

            const result = await db.insert(permissaoColaborador).values({ colaboradorId: colaborador.insertId, permissaoId: 1});
            return result;
        })
        if(!result) response.status(400).send({ result })

        response.status(201)
            .json({ message: "User created successfully" });
    } catch(error){
        return response.status(500).json(error);
    }
}
