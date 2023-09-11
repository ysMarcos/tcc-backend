import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { permissaoColaborador } from "../permissao-colaborador/schema";

export const permissao = mysqlTable('permissao', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const permissaoInsertSchema = createInsertSchema(permissao, {
    nome: z
    .string({ required_error: "Nome is required" })
    .min(3, { message: "Nome should be 3 or more characters long" })
    .max(50, { message: "Nome should be 50 or fewer characters long" })
});

export const permissaoRelations = relations(permissao, ({ many }) => ({
    permissaoColaborador: many(permissaoColaborador)
}))
