import { relations } from "drizzle-orm";
import { float, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';
import { itemCategoriaTable } from "../item-categoria/schema";

export const itemTable = mysqlTable('item', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique(),
    descricao: varchar('descricao', { length: 150 }),
    valorUnitario: float('valor_unitario').notNull(),
    quantidade: int('quantidade').default(0),
    createdAt: timestamp('createdAt').defaultNow()
})

export const itemRelations = relations(itemTable, ({ many }) => ({
    itemCategoria: many(itemCategoriaTable)
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
        .positive("O valo deve ser positivo")
})

export const itemUpdateSchema = createInsertSchema(itemTable, {
    nome: z
        .string()
        .min(3, { message: "Item should be 3 or more characters long" })
        .max(50, { message: "Item should be 50 or fewer characters long" })
        .optional(),
    descricao: z
        .string()
        .min(3, { message: "Descricao should be 3 or more characters long" })
        .max(50, { message: "Descricao should be 150 or fewer characters long" })
        .optional(),
    valorUnitario: z
        .number()
        .positive("The value must be positive")
        .optional()
})
