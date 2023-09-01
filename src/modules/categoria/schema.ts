import { InferSelectModel } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const categoria = mysqlTable('categoria', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique()
});

export const categoriaInsertSchema = createInsertSchema(categoria, {
    nome: z
    .string({
        required_error: "Nome não preenchido"
    })
    .min(3)
    .max(50),
});
export const categoriaSelectSchema = createSelectSchema(categoria);

export type Categoria = InferSelectModel<typeof categoria>;
