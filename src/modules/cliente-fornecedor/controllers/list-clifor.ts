import { and, eq, like, or, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { pessoaTable } from '../../pessoa/schema';
import { clienteFornecedorTable } from '../schema';

export async function listClienteFornecedor(request: Request, response: Response){
    const {
        nome,
        cadastro,
        isCliente,
        limit,
        page
    } = request.query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
        .select()
        .from(clienteFornecedorTable)
        .innerJoin(
            pessoaTable,
            eq(
                pessoaTable.id, clienteFornecedorTable.pessoaId
            )
        )
        .where(
            and(
                eq(clienteFornecedorTable.isCliente, sql.placeholder("isCliente")),
                like(pessoaTable.nome, sql.placeholder("nome")),
                like(pessoaTable.cadastro, sql.placeholder("cadastro"))
            )
        )
        .limit(limitReference)
        .offset(offset)
        .prepare()
    try {
        const result = await sqlQuery.execute({
            nome : `%${nome}%`,
            cadastro : `%${cadastro}%`,
            isCliente
        });
        return response.status(200).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
