import { Request, Response } from "express";
import { db } from "../../../db";
import { pessoaTable, pessoaUpdateSchema } from "../schema";
import { eq, sql } from "drizzle-orm";

type newData = {
    nome: string,
    email: string,
    telefone: string,
    cadastro: string,
    registro: string
}

export async function updatePessoa(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const requestData: newData = request.body;

    let newData: Record<string, string> = {};
    if(requestData.nome && requestData.nome.length >= 3) newData.nome = requestData.nome;
    if(requestData.email && requestData.email.length >= 3) newData.email = requestData.email;
    if(requestData.telefone && requestData.telefone.length >= 3) newData.telefone = requestData.telefone;
    if(requestData.cadastro && requestData.cadastro.length >= 3) newData.cadastro = requestData.cadastro;
    if(requestData.registro && requestData.registro.length >= 3) newData.registro = requestData.registro;

    const getPessoaToUpdateQuery = db
        .select()
        .from(pessoaTable)
        .where(
            eq(
                pessoaTable.id, sql.placeholder("id")
            )
        )
        .prepare();

    try {
        const isValid = pessoaUpdateSchema.safeParse(newData);
        if(!isValid.success) return response.status(400).send(isValid.error.issues[0].message);
        console.log(newData)
        const result = await db.transaction(async (transaction) => {
            const [pessoa] = await getPessoaToUpdateQuery.execute({id});
            if(!pessoa) {
                transaction.rollback();
            }
            const updatedPessoa = await db
                .update(pessoaTable)
                .set({
                    ...pessoa,
                    ...newData
                })
                .where(
                    eq(
                        pessoaTable.id, id
                    )
                );
            return updatedPessoa
        })

        response.status(200).json(result)
    } catch (error) {
        return response.status(400).json(error)
    }
}
