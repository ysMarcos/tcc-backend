import { relations } from "drizzle-orm";
import { float, int, mysqlTable } from "drizzle-orm/mysql-core";
import { itemTable } from "../item/schema";
import { vendaTable } from "../venda/schema";

export const itemVendaTable = mysqlTable("item_venda", {
    id: int('id').autoincrement().primaryKey(),
    itemId: int('item_id').notNull().references(() => itemTable.id),
    vendaId:int('venda_id').notNull().references(() => vendaTable.id),
    quantidade: int('quantidade').notNull(),
    valor: float('valor').notNull()
})

export const itemVendaRelations = relations(itemVendaTable, ({one}) => ({
    item: one(itemTable, {
        fields: [itemVendaTable.itemId],
        references: [itemTable.id]
    }),
    categoria: one(vendaTable, {
        fields: [itemVendaTable.vendaId],
        references: [vendaTable.id]
    })
}))
