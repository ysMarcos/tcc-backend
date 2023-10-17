import { and, between, like, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { vendaTable } from '../schema';

export async function listVenda(request: Request, response: Response){
    const { query } = request;
    const { limit, page, colaboradorId, clienteFornecedorId, dataInicio, dataFim } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
        .select()
        .from(vendaTable)
        .where(
            and(
                like(vendaTable.colaboradorId, sql.placeholder("colaboradorId")),
                like(vendaTable.clienteFornecedorId, sql.placeholder("clienteFornecedorId")),
                between(vendaTable.dataVenda, sql.placeholder("dataInicio"), sql.placeholder("dataFim"))
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
            dataFim
        });
        console.log(query)
        return response.status(200).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
