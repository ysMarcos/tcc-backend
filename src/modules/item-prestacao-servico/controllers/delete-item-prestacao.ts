import { Request, Response } from "express";
import { itemPrestacaoServicoTable } from "../schema";
import { db } from "../../../db";
import { sql, eq } from "drizzle-orm";

export async function deleteItemPrestacao(request: Request, response: Response) {
    const itemServicoId = Number(request.params.itemServicoId);

    const sqlQuery = db
    .delete(itemPrestacaoServicoTable)
    .where(
        eq(
            itemPrestacaoServicoTable.id, sql.placeholder("itemServicoId")
        )
    );
    try {

        const result = await db.transaction( async (transaction) => {
            const [result] = await sqlQuery.execute({itemServicoId});
            if(!result) transaction.rollback();
            return result;
        })

        return response.status(200).json(result);
    } catch (error) {
        return response.status(400).json(error);
    }
}
