import { relations } from "drizzle-orm";
import { float, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { unidadeMedida } from "../unidade-medida/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';
import { itemCategoria } from "../item-categoria/schema";

export const itemTable = mysqlTable('item', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique(),
    descricao: varchar('descricao', { length: 150 }),
    valorUnitario: float('valor_unitario').notNull(),
    unidadeMedidaId: int('unidade_medida_id').notNull().references(() => unidadeMedida.id),
    createdAt: timestamp('createdAt').defaultNow()
})

export const itemRelations = relations(itemTable, ({ one, many }) => ({
    unidadeMedida: one(unidadeMedida, {
        fields: [itemTable.unidadeMedidaId],
        references: [unidadeMedida.id]
    }),
    itemCategoria: many(itemCategoria)
}))

export const itemInsertSchema = createInsertSchema(itemTable, {
    nome: z
        .string({
            required_error: "Nome is required"
        })
        .min(3, { message: "Item should be 3 or more characters long" })
        .max(50, { message: "Item should be 50 or fewer characters long" }),
    descricao: z
        .string()
        .min(3, { message: "Descricao should be 3 or more characters long" })
        .max(50, { message: "Descricao should be 150 or fewer characters long" }),
    valorUnitario: z
        .number({
            required_error: "Valor is required"
        })
        .positive("O valo deve ser positivo"),
    unidadeMedidaId: z
        .number({
            required_error: "unidadeMedidaId is required"
        })
})
