import { sql, eq, and } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemPrestacaoServicoTable } from "../schema";
import { itemTable } from "../../item/schema";

export async function addItemToPrestacaoServico(request: Request, response: Response) {
    const { params, body } = request;
    const prestacaoServicoId = Number(params.id);
    const data = body;

    const sqlQuery = db
        .insert(itemPrestacaoServicoTable)
        .values({
            itemId: sql.placeholder("itemId"),
            psId: sql.placeholder("prestacaoServicoId"),
            quantidade: sql.placeholder("quantidade"),
            retornado: sql.placeholder("retornado")
        })
        .prepare()

    const findItemQuery = db
        .select({
            id: itemTable.id,
            quantidade: itemTable.quantidade
        })
        .from(itemTable)
        .where(
            eq(
                itemTable.id, sql.placeholder("itemId")
            )
        )
        .prepare()

    try {
        const result = await db.transaction(async (transaction) => {
            const [item] = await findItemQuery.execute({ itemId: data.itemId })
            if (!item) transaction.rollback();

            if (item.quantidade < data.quantidade) {
                transaction.rollback();
            }
            const baixaItem = await db.update(itemTable)
                .set({
                    quantidade: item.quantidade - data.quantidade
                })
                .where(
                    eq(
                        itemTable.id, data.itemId
                    )
                )
            if (!baixaItem) transaction.rollback();     

            const result = await sqlQuery.execute({
                itemId: data.itemId,
                prestacaoServicoId,
                quantidade: data.quantidade,
                retornado: data.retornado
            })
            return result;
        });
        return response.status(200).json(result);
    } catch (error) {
        return response.status(400).json(error);
    }
}
