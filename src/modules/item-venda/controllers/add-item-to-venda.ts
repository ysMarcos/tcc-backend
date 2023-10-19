import { sql, eq, and } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../../item/schema";
import { vendaTable } from "../../venda/schema";
import { itemVendaTable } from "../schema";

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
            const quantidade = Number(produto.quantidade);

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
                const [itemVenda] = await itemVendaSqlQuery.execute({
                    vendaId,
                    itemId: produto.itemId
                })

                if(itemVenda){
                    const result = await db
                        .update(itemVendaTable)
                        .set({
                            quantidade: itemVenda.quantidade + quantidade
                        })
                        .where(
                            and(
                                eq(itemVendaTable.vendaId, vendaId),
                                eq(itemVendaTable.itemId, produto.itemId)
                            )
                        );

                    if(!result){
                        transaction.rollback();
                    }
                } else{
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
                }
            });
        }

        return response.status(200).json(vendaId);
    } catch(error){
        return response.status(400).json(error);
    }
}
