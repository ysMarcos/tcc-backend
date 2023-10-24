import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { prestacaoServicoTable } from "../servico-prestacao/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const servicoTable = mysqlTable('servico', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const servicoRelations = relations(servicoTable, ({ many }) => ({
    servicoPrestacao: many(prestacaoServicoTable)
}))

export const servicoInsertSchema = createInsertSchema(servicoTable, {
    nome: z
    .string({
        required_error: "Nome is required"
    })
    .min(3, { message: "Nome should be 3 or more characters long" })
    .max(50, { message: "Nome should be 50 or fewer characters long" })
});
