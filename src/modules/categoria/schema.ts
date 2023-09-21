import { InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { itemCategoria } from "../item-categoria/schema";

export const categoriaTable = mysqlTable('categoria', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const categoriaRelations = relations(categoriaTable, ({many}) => ({
    itemCategoria: many(itemCategoria)
}))

export const categoriaInsertSchema = createInsertSchema(categoriaTable, {
    nome: z
    .string({
        required_error: "Nome is required"
    })
    .min(3, { message: "Nome should be 3 or more characters long" })
    .max(50, { message: "Nome should be 50 or fewer characters long" })
});
export const categoriaUpdateSchema = createInsertSchema(categoriaTable, {
    nome: z
    .string({
        required_error: "Nome is required"
    })
    .min(3, { message: "Nome should be 3 or more characters long" })
    .max(50, { message: "Nome should be 50 or fewer characters long" })
    .optional()
});
export const categoriaSelectSchema = createSelectSchema(categoriaTable);

export type Categoria = InferSelectModel<typeof categoriaTable>;
