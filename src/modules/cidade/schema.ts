import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';
import { enderecoTable } from "../endereco/schema";

export const cidadeTable = mysqlTable('cidade', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).unique().notNull(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const cidadeRelations = relations(cidadeTable, ({many}) => ({
    enderecos: many(enderecoTable)
}));

export const cidadeInsertSchema = createInsertSchema(cidadeTable, {
    nome: z
        .string({
            required_error: "Nome is required"
        })
        .min(3, { message: "Nome should be 3 or more characters long" })
        .max(50, { message: "Nome should be 50 or fewer characters long" })
})

export const cidadeUpdateSchema = createInsertSchema(cidadeTable, {
    nome: z
        .string({
            required_error: "Nome is required"
        })
        .min(3, { message: "Nome should be 3 or more characters long" })
        .max(50, { message: "Nome should be 50 or fewer characters long" })
        .optional()
})
