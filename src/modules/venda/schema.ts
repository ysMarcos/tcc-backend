import { relations } from "drizzle-orm";
import { int, datetime, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { colaboradorTable } from "../colaborador/schema";
import { z } from "zod";

export const vendaTable = mysqlTable("venda", {
    id: int('id').autoincrement().primaryKey(),
    dataVenda: datetime('data_venda').notNull(),
    colaboradorId: int('colaborador_id').references(() => colaboradorTable.id).notNull(),
    clienteFornecedorId: int('cliente_fornecedor_id'),
    createdAt: timestamp('createdAt').defaultNow()
})

export const vendaRelations = relations(vendaTable, ({ one }) => ({
    colaborador: one(colaboradorTable, {
        fields: [vendaTable.colaboradorId],
        references: [colaboradorTable.id]
    })
}))

export const vendaInsertSchema = createInsertSchema(vendaTable, {
    dataVenda: z
        .date({
            required_error: "Data is required",
            invalid_type_error: "Data must be a valid date"
        }),
    colaboradorId: z
        .number({
            required_error: "ColaboradorID is required",
            invalid_type_error: "ColaboradorID must be a number"
        }),
    clienteFornecedorId: z
        .number({
            invalid_type_error: "ClienteFornecedorID must be a number"
        })
        .optional()
})
