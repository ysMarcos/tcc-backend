import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { itemTable } from "../item/schema";
import { prestacaoServicoTable } from "../servico-prestacao/schema";
import { relations } from "drizzle-orm";

export const itemPrestacaoServicoTable = mysqlTable("item_servico", {
    id: int('id').autoincrement().primaryKey(),
    itemId: int('item_id').notNull().references(() => itemTable.id),
    psId:int('prestacaoservico_id').notNull().references(() => prestacaoServicoTable.id),
    quantidade: int('quantidade').notNull()
})

export const itemPrestacaoServicoRealtions = relations(itemPrestacaoServicoTable, ({ one }) => ({
    item: one(itemTable, {
        fields: [itemPrestacaoServicoTable.itemId],
        references: [itemTable.id]
    }),
    servico: one(prestacaoServicoTable, {
        fields: [itemPrestacaoServicoTable.psId],
        references: [prestacaoServicoTable.id]
    })
}))
