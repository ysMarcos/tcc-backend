import { sql, eq, and } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../../item/schema";
import { vendaTable } from "../../venda/schema";
import { itemVendaInsertSchema, itemVendaTable } from "../schema";

export async function addItemToVenda (request: Request, response: Response) {
    const { params, body } = request;
    const vendaId = Number(params.vendaId);
    const { carrinho } = body;

    const itemSqlQuery  = db
        .select()
        .from(itemTable)
        .where(
            eq(
                itemTable.id, sql.placeholder("itemId")
            )
        )
        .prepare();
    const vendaSqlQuery = db
        .select()
        .from(vendaTable)
        .where(
            eq(
                vendaTable.id, sql.placeholder("vendaId")
            )
        )
        .prepare();
    const itemVendaSqlQuery = db
            .select()
            .from(itemVendaTable)
            .where(
                and(
                    eq(itemVendaTable.vendaId, sql.placeholder("vendaId")),
                    eq(itemVendaTable.itemId, sql.placeholder("itemId"))
                )
            )
    try {
        for ( const produto of carrinho ){
            const isValid = itemVendaInsertSchema.safeParse({
                itemId: produto.itemId,
                vendaId: vendaId,
                quantidade: produto.quantidade
            });
            if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

            await db.transaction( async (transaction) => {
                const [venda] = await vendaSqlQuery.execute({vendaId});
                if (!venda){
                    transaction.rollback();
                }
                const [item] = await itemSqlQuery.execute({
                    itemId: produto.itemId
                });
                if (!item){
                    transaction.rollback();
                }
                const result = await db
                        .insert(itemVendaTable)
                        .values({
                            vendaId,
                            itemId: item.id,
                            quantidade: produto.quantidade,
                            valor: item.valorUnitario
                        });

                if(!result){
                    transaction.rollback();
                }
                return result;
            });
        }

        return response.status(200).json(vendaId);
    } catch(error){
        return response.status(400).json(error);
    }
}
