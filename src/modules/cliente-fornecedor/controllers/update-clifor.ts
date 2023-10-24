import { eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { clienteFornecedorTable } from '../schema';

export async function updateClienteFornecedor(request: Request, response: Response){
    const newData = request.body;
    const id = Number(request.params.id);

    const sqlQuery = db
        .select()
        .from(clienteFornecedorTable)
        .where(
            eq(
                clienteFornecedorTable.id, sql.placeholder("id")
            )
        )
        .prepare();

    try {
        const result = await db.transaction(async (transaction) => {
            const [clifor] = await sqlQuery.execute({ id });
            if(!clifor){
                transaction.rollback();
                return;
            }
            const result = await db
                .update(clienteFornecedorTable)
                .set({
                    ...clifor,
                    ...newData
                })
                .where(eq(
                    clienteFornecedorTable.id, id
                ))
            return result;
        })
        return response.status(200).json(result)
    } catch(error){
        return response.status(400).json(error);
    }
}
