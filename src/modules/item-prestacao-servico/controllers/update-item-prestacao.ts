import { Request, Response } from "express";
import { db } from "../../../db";
import { sql, eq, and } from "drizzle-orm";
import { itemPrestacaoServicoTable } from "../schema";
import { itemTable } from "../../item/schema";


export async function updateItemServico(request: Request, response: Response) {
    const id = Number(request.params.id);
    const servicoId = Number(request.params.servicoId);
    const itemServicoId = Number(request.params.itemServicoId);
    const data = request.body;

    let newData: Record<any, any> = {};
    if (data.quantidade && data.quantidade.length > 0) newData.quantidade = data.quantidade;
    if (data.retornado) newData.retornado = data.retornado;

    const resultSql = db
        .select({
            id: itemPrestacaoServicoTable.id,
            quantidade: itemPrestacaoServicoTable.quantidade,
            retornado: itemPrestacaoServicoTable.retornado,
            itemId: itemPrestacaoServicoTable.itemId,
        })
        .from(itemPrestacaoServicoTable)
        .where(
            eq(
                itemPrestacaoServicoTable.id, sql.placeholder("itemServicoId")
            )
        )
        .prepare();

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

            const [itemPR] = await resultSql.execute({ itemServicoId });
            if (!itemPR) transaction.rollback();

            const [item] = await findItemQuery.execute({ itemId: itemPR.itemId })
            if (!item) transaction.rollback();

            if (item.quantidade < newData.quantidade) {
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

            const [result] = await transaction
                .update(itemPrestacaoServicoTable)
                .set({
                    ...itemPR,
                    ...newData
                })
                .where(
                    eq(itemPrestacaoServicoTable.id, itemPR.id)
                );


            const [itemPR2] = await resultSql.execute({ itemServicoId });
            if (!itemPR2) transaction.rollback();

            if (itemPR2.retornado === true) {
                await db.update(itemTable)
                    .set({
                        quantidade: item.quantidade + itemPR.quantidade
                    })
                    .where(
                        eq(itemTable.id, itemPR.itemId)
                    )
            }

            return result
        })

        response.status(200).json(result);
    } catch (error) {
        return response.status(400).json(error);
    }
}
