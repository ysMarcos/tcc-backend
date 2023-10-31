import { Request, Response } from 'express';
import { db } from '../../../db';
import { pessoaEnderecoTable } from '../schema';
import { enderecoTable } from '../../endereco/schema';
import { eq, sql } from 'drizzle-orm';

export async function listPessoaEndereco(request: Request, response: Response){
    const pessoaId = Number(request.params.pessoaId);

    const sqlQuery = db
        .select()
        .from(pessoaEnderecoTable)
        .innerJoin(
            enderecoTable,
            eq( enderecoTable.id, pessoaEnderecoTable.enderecoId)
        )
        .where(
            eq(
                pessoaEnderecoTable.pessoaId, sql.placeholder("pessoaId")
            )
        )
    try {
        const result = await sqlQuery.execute({ pessoaId });
        return response.status(200).json(result)
    } catch(error){
        return response.status(500).json(error);
    }
}
