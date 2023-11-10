import { and, between, eq, like, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { compraTable } from '../schema';
import { colaboradorTable } from '../../colaborador/schema';
import { clienteFornecedorTable } from '../../cliente-fornecedor/schema';
import { pessoaTable } from '../../pessoa/schema';

export async function listCompra(request: Request, response: Response){
    const { query } = request;
    const { limit, page, colaborador, clienteFornecedor } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
        .select({
            id: compraTable.id,
            colaborador: colaboradorTable.usuario,
            fornecedor: pessoaTable.nome,
            dataCompra: sql`DATE_FORMAT(${compraTable.dataCompra}, "%d/%c/%Y")`,
            valor: compraTable.valorTotal
        })
        .from(compraTable)
        .innerJoin(
            colaboradorTable,
            eq(
                colaboradorTable.id, compraTable.colaboradorId
            )
        )
        .innerJoin(
            clienteFornecedorTable,
            eq(
                clienteFornecedorTable.id, compraTable.clienteFornecedorId
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
                like(colaboradorTable.usuario, sql.placeholder("colaborador")),
                like(pessoaTable.nome, sql.placeholder("clienteFornecedor")),
            )
        )
        .limit(limitReference)
        .offset(offset)
        .prepare();
    try {
        const result = await sqlQuery.execute({
            colaborador: `%${colaborador}%`,
            clienteFornecedor: `%${clienteFornecedor}%`
        });

        return response.status(200).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
