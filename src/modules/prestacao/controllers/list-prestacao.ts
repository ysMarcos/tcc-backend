import { and, between, like, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { prestacaoTable } from '../schema';

export async function listPrestacao(request: Request, response: Response){
    const { query } = request;
    const { limit, page, colaboradorId, clienteFornecedorId } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
        .select()
        .from(prestacaoTable)
        .where(
            and(
                like(prestacaoTable.colaboradorId, sql.placeholder("colaboradorId")),
                like(prestacaoTable.clienteFornecedorId, sql.placeholder("clienteFornecedorId"))
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
