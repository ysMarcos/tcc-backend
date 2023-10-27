import { relations } from "drizzle-orm";
import { float, int, mysqlTable } from "drizzle-orm/mysql-core";
import { itemTable } from "../item/schema";
import { compraTable } from "../compra/schema";
//TODO: Criar metodo RemoveItemFromCompra
export const itemCompraTable = mysqlTable("item_compra", {
    id: int('id').autoincrement().primaryKey(),
    itemId: int('item_id').notNull().references(() => itemTable.id),
    compraId:int('compra_id').notNull().references(() => compraTable.id),
    quantidade: int('quantidade').notNull(),
    valor: float('valor').notNull()
})

export const itemCompraRelations = relations(itemCompraTable, ({one}) => ({
    item: one(itemTable, {
        fields: [itemCompraTable.itemId],
        references: [itemTable.id]
    }),
    compra: one(compraTable, {
        fields: [itemCompraTable.compraId],
        references: [compraTable.id]
    })
}))
