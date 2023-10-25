import { Request, Response } from 'express';
import { db } from '../../../db';
import { pessoaEndereco } from '../schema';
import { endereco } from '../../endereco/schema';
import { eq, sql } from 'drizzle-orm';

export async function listPessoaEndereco(request: Request, response: Response){
    const pessoaId = Number(request.params.pessoaId);

    const sqlQuery = db
        .select()
        .from(pessoaEndereco)
        .innerJoin(
            endereco,
            eq( endereco.id, pessoaEndereco.enderecoId)
        )
        .where(
            eq(
                pessoaEndereco.pessoaId, sql.placeholder("pessoaId")
            )
        )
    try {
        const result = await sqlQuery.execute({ pessoaId });
        return response.status(200).json(result)
    } catch(error){
        return response.status(500).json(error);
    }
}
