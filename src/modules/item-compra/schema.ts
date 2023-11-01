import { relations } from "drizzle-orm";
import { float, int, mysqlTable } from "drizzle-orm/mysql-core";
import { itemTable } from "../item/schema";
import { compraTable } from "../compra/schema";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

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

export const itemCompraInsertSchema = createInsertSchema(itemCompraTable, {
    itemId: z
        .number({
            required_error: "itemId is required",
            invalid_type_error: "itemId must be an integer"
        }),
    compraId: z
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
