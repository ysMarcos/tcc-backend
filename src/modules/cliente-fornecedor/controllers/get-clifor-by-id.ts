import { eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { pessoaTable } from '../../pessoa/schema';
import { clienteFornecedorTable } from '../schema';

export async function getClienteFornecedorById(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);

    const sqlQuery = db
        .select()
        .from(clienteFornecedorTable)
        .innerJoin(
            pessoaTable, eq(
                pessoaTable.id, clienteFornecedorTable.id
            )
        )
        .where(
            eq(
                clienteFornecedorTable.id, sql.placeholder("id")
            )
        )
       .prepare();
    try {
        const clifor = await sqlQuery.execute({ id });
        return response.status(200).json(clifor);
    } catch(error){
        return response.status(400).json(error);
    }
}
