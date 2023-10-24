import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { vendaTable } from "../schema";
import { itemVendaTable } from "../../item-venda/schema";

export async function deleteVenda(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const sqlQuery = db
        .delete(vendaTable)
        .where(
            eq(
                vendaTable.id, sql.placeholder("id")
            )
        )
        .prepare();
    const deleteItensQuery = db
            .delete(itemVendaTable)
            .where(
                eq(
                    itemVendaTable.vendaId, sql.placeholder("vendaId")
                )
            )
    try {
        const result = await db.transaction( async (transaction) => {
            const [deleteItensVenda] = await deleteItensQuery.execute({
                vendaId: id
            })
            if(!deleteItensVenda){
                transaction.rollback();
            }
            const result = await sqlQuery.execute({ id });
            if(!result){
                transaction.rollback();
            }
            return result;
        })
        return response.status(200).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
