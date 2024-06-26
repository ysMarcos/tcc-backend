import { and, between, eq, like, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { vendaTable } from '../schema';
import { colaboradorTable } from '../../colaborador/schema';
import { clienteFornecedorTable } from '../../cliente-fornecedor/schema';
import { pessoaTable } from '../../pessoa/schema';

export async function listVenda(request: Request, response: Response){
    const { query } = request;
    const { limit, page, colaboradorId, clienteFornecedorId } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
        .select({
            id: vendaTable.id,
            colaborador: colaboradorTable.usuario,
            cliente: pessoaTable.nome,
            dataVenda: sql`DATE_FORMAT(${vendaTable.dataVenda}, "%d/%c/%Y")`
        })
        .from(vendaTable)
        .innerJoin(
            colaboradorTable,
            eq(
                colaboradorTable.id, vendaTable.colaboradorId
            )
        )
        .innerJoin(
            clienteFornecedorTable,
            eq(
                clienteFornecedorTable.id, vendaTable.clienteFornecedorId
            )
        )
        .innerJoin(
            pessoaTable,
            eq(
                pessoaTable.id, clienteFornecedorTable.pessoaId
            )
        )
        .where(
            and(
                like(vendaTable.colaboradorId, sql.placeholder("colaboradorId")),
                like(vendaTable.clienteFornecedorId, sql.placeholder("clienteFornecedorId"))
            )
        )
        .limit(limitReference)
        .offset(offset)
        .prepare();
    try {
        const result = await sqlQuery.execute({
            colaboradorId: `%${colaboradorId}%`,
            clienteFornecedorId: `%${clienteFornecedorId}%`
        });

        return response.status(200).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
