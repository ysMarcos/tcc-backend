import { like, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { colaboradorTable } from '../schema';

export async function listColaborador(request: Request, response: Response){
    const { query } = request;
    const { usuario, limit, page } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
    .select({
        id: colaboradorTable.id,
        user: colaboradorTable.usuario,
        dataInicio: colaboradorTable.dataInicio,
        dataFim: colaboradorTable.dataPrevisaoFim,
        pessoaId: colaboradorTable.pessoaId,
        ativo: colaboradorTable.ativo
    })
    .from(colaboradorTable)
    .where(
        like(
            colaboradorTable.usuario, sql.placeholder("usuario")
        )
    )
    .orderBy(
        colaboradorTable.usuario
    )
    .limit(limitReference)
    .offset(offset)
    .prepare();

    try {
        const result = await sqlQuery.execute({
            usuario: `%${usuario}%`
        })
        response.status(200).json({ result });
    } catch(error){
        return response.status(500).json(error);
    }
}
