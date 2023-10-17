import { Request, Response } from "express";
import { db } from "../../../db";
import { vendaTable } from "../schema";
import { eq, sql } from "drizzle-orm";

export async function updateVenda(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const newData = request.body;

    const getVendaToUpdateQuery = db
        .select()
        .from(vendaTable)
        .where(
            eq(
                vendaTable.id, sql.placeholder("id")
            )
        )
        .prepare();

    try {

        const result = await db.transaction(async (transaction) => {
            const [venda] = await getVendaToUpdateQuery.execute({id});
            if(!venda) {
                transaction.rollback();
            }
            const updatedVenda = await db
                .update(vendaTable)
                .set({
                    ...venda,
                    ...newData
                })
                .where(
                    eq(
                        vendaTable.id, id
                    )
                );
            return updatedVenda;
        })

        response.status(200).json(result)
    } catch (error) {
        return response.status(400).json(error)
    }
}
