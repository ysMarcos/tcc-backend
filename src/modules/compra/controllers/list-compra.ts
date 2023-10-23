import { and, between, like, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { compraTable } from '../schema';

export async function listCompra(request: Request, response: Response){
    const { query } = request;
    const { limit, page, colaboradorId, clienteFornecedorId, dataInicio, dataFim, valorMin, valorMax } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
        .select()
        .from(compraTable)
        .where(
            and(
                like(compraTable.colaboradorId, sql.placeholder("colaboradorId")),
                like(compraTable.clienteFornecedorId, sql.placeholder("clienteFornecedorId")),
                between(compraTable.dataCompra, sql.placeholder("dataInicio"), sql.placeholder("dataFim")),
                between(compraTable.valorTotal, sql.placeholder("valorMin"), sql.placeholder("valorMax")),
            )
        )
        .limit(limitReference)
        .offset(offset)
        .prepare();
    try {
        const result = await sqlQuery.execute({
            colaboradorId: `%${colaboradorId}%`,
            clienteFornecedorId: `%${clienteFornecedorId}%`,
            dataInicio,
            dataFim,
            valorMin,
            valorMax
        });

        return response.status(200).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
