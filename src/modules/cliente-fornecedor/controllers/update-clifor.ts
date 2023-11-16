import { eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { clienteFornecedorTable } from '../schema';
import { pessoaTable } from '../../pessoa/schema';

type newData = {
    nome: string,
    email: string,
    telefone: string,
    cadastro: string,
    registro: string
}

export async function updateClienteFornecedor(request: Request, response: Response){
    const id = Number(request.params.id);

    const requestData: newData = request.body;

    let newData: Record<string, string> = {};
    if(requestData.nome && requestData.nome.length >= 3) newData.nome = requestData.nome;
    if(requestData.email && requestData.email.length >= 3) newData.email = requestData.email;
    if(requestData.telefone && requestData.telefone.length >= 3) newData.telefone = requestData.telefone;
    if(requestData.cadastro && requestData.cadastro.length >= 3) newData.cadastro = requestData.cadastro;
    if(requestData.registro && requestData.registro.length >= 3) newData.registro = requestData.registro;

    const sqlQuery = db
        .select({
            id: pessoaTable.id,
            nome: pessoaTable.nome,
            email: pessoaTable.email,
            telefone: pessoaTable.telefone,
            cadastro: pessoaTable.cadastro,
            registro: pessoaTable.registro
        })
        .from(pessoaTable)
        .innerJoin(
            clienteFornecedorTable,
            eq(
                clienteFornecedorTable.pessoaId, pessoaTable.id
            )
        )
        .where(
            eq(
                pessoaTable.id, sql.placeholder("id")
            )
        )
        .prepare();

    try {
        const result = await db.transaction(async (transaction) => {
            const [clifor] = await sqlQuery.execute({ id });
            if(!clifor){
                transaction.rollback();
            }
            const result = await transaction
                .update(pessoaTable)
                .set({
                    ...clifor,
                    ...newData
                })
                .where(
                eq(
                    pessoaTable.id, clifor.id
                ))
            return result;
        })
        return response.status(200).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
