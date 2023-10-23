import { Request, Response } from "express";
import { db } from "../../../db";
import { prestacaoTable } from "../schema";
import { eq, sql } from "drizzle-orm";

export async function updatePrestacao(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const newData = request.body;

    const getPrestacaoToUpdateQuery = db
        .select()
        .from(prestacaoTable)
        .where(
            eq(
                prestacaoTable.id, sql.placeholder("id")
            )
        )
        .prepare();

    try {

        const result = await db.transaction(async (transaction) => {
            const [prestacao] = await getPrestacaoToUpdateQuery.execute({id});
            if(!prestacao) {
                transaction.rollback();
            }
            const result = await db
                .update(prestacaoTable)
                .set({
                    ...prestacao,
                    ...newData
                })
                .where(
                    eq(
                        prestacaoTable.id, id
                    )
                );
            return result;
        })

        response.status(200).json(result)
    } catch (error) {
        return response.status(400).json(error)
    }
}
