import { sql, eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../../item/schema";
import { itemCompraInsertSchema, itemCompraTable } from "../schema";
import { compraTable } from "../../compra/schema";

export async function addItemToCompra (request: Request, response: Response) {
    const { params, body } = request;
    const compraId = Number(params.compraId);
    const { carrinho } = body;

    const itemSqlQuery = db
        .select()
        .from(itemTable)
        .where(
            eq(
                itemTable.id, sql.placeholder("itemId")
            )
        )
        .prepare();
    const compraSqlQuery = db
        .select()
        .from(compraTable)
        .where(
            eq(
                compraTable.id, sql.placeholder("compraId")
            )
        )
        .prepare();
    try {
        for ( const produto of carrinho ){
            const isValid = itemCompraInsertSchema.safeParse({
                itemId: produto.itemId,
                compraId: compraId,
                quantidade: produto.quantidade
            });
            if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

            await db.transaction( async (transaction) => {
                const [compra] = await compraSqlQuery.execute({compraId});
                if (!compra){
                    transaction.rollback();
                }
                const [item] = await itemSqlQuery.execute({
                    itemId: produto.itemId
                });
                if (!item){
                    transaction.rollback();
                }
                const result = await db
                    .insert(itemCompraTable)
                    .values({
                        itemId: item.id,
                        compraId,
                        quantidade: produto.quantidade,
                        valor: item.valorUnitario
                    });

                await db
                    .update(itemTable)
                    .set({
                        quantidade: item.quantidade + produto.quantidade
                    })
                    .where(eq(itemTable.id, item.id))

                if(!result){
                    transaction.rollback();
                }
                return result;
            });
        }

        return response.status(200).json(compraId);
    } catch(error){
        return response.status(400).json(error);
    }
}
