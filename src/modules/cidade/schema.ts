import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';
import { endereco } from "../endereco/schema";

export const cidade = mysqlTable('cidade', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).unique().notNull(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const cidadeRelations = relations(cidade, ({many}) => ({
    enderecos: many(endereco)
}));

export const cidadeInsertSchema = createInsertSchema(cidade, {
    nome: z
    .string({
        required_error: "Nome não preenchido"
    })
    .min(3)
    .max(50),
})

export type Cidade = InferSelectModel<typeof cidade>;
export type InsertCidade = InferInsertModel<typeof cidade>;
