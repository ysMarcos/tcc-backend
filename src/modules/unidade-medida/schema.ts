import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const unidadeMedidaTable = mysqlTable('unidade-medida', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).unique().notNull(),
    createdAt: timestamp('createdAt').defaultNow()
})

export const unidadeMedidaInsertSchema = createInsertSchema(unidadeMedidaTable, {
    nome: z
        .string({
            required_error: 'Nome is required.',
        })
        .min(1, {
            message:'Nome must be at least one character long.'
        })
        .max(50, {
            message: 'Nome should not exceed 50 characters.'
        })
})
