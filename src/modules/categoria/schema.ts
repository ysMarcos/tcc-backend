import { InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { itemCategoria } from "../item-categoria/schema";

export const categoria = mysqlTable('categoria', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const categoriaRelations = relations(categoria, ({many}) => ({
    itemCategoria: many(itemCategoria)
}))

export const categoriaInsertSchema = createInsertSchema(categoria, {
    nome: z
    .string({
        required_error: "Nome is required"
    })
    .min(3, { message: "Nome should be 3 or more characters long" })
    .max(50, { message: "Nome should be 50 or fewer characters long" })
});
export const categoriaSelectSchema = createSelectSchema(categoria);

export type Categoria = InferSelectModel<typeof categoria>;
