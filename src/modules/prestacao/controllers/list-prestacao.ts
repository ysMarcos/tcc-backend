import { and, between, eq, like, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { prestacaoTable } from '../schema';
import { clienteFornecedorTable } from '../../cliente-fornecedor/schema';
import { colaboradorTable } from '../../colaborador/schema';
import { pessoaTable } from '../../pessoa/schema';

export async function listPrestacao(request: Request, response: Response){
    const { query } = request;
    const { limit, page } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
        .select({
            id: prestacaoTable.id,
            cliente: pessoaTable.nome,
            funcionario: colaboradorTable.usuario
        })
        .from(prestacaoTable)
        .innerJoin(
            clienteFornecedorTable,
            eq(
                clienteFornecedorTable.id, prestacaoTable.clienteFornecedorId
            )
        )
        .innerJoin(
            colaboradorTable,
            eq(
                colaboradorTable.id, prestacaoTable.colaboradorId
            )
        )
        .innerJoin(
            pessoaTable,
            eq(
                pessoaTable.id, clienteFornecedorTable.pessoaId
            )
        )
        .limit(limitReference)
        .offset(offset)
        .prepare();
    try {   
        const result = await sqlQuery.execute();

        return response.status(200).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
