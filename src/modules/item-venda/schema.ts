import { relations } from "drizzle-orm";
import { float, int, mysqlTable } from "drizzle-orm/mysql-core";
import { itemTable } from "../item/schema";
import { vendaTable } from "../venda/schema";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

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

export const itemVendaInsertSchema = createInsertSchema(itemVendaTable, {
    itemId: z
        .number({
            required_error: "itemId is required",
            invalid_type_error: "itemId must be an integer"
        }),
    vendaId: z
        .number({
            required_error: "vendaId is required",
            invalid_type_error: "vendaId must be an integer"
        }),
    quantidade: z
        .number({
            required_error: "quantidade is required",
            invalid_type_error: "quantidade must be an integer"
        })
        .positive({
            message: "quantidade must be positive"
        }),
    valor: z
        .number()
        .optional()
})
