import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { boolean, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from 'zod';
import { pessoaEndereco } from "../pessoa-endereco/schema";

export const pessoa = mysqlTable('pessoa', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length:  150 }).notNull(),
    email: varchar('email', { length:  100 }).unique().notNull(),
    telefone: varchar('telefone', { length:  11 }).unique().notNull(),
    cadastro: varchar('cadastro', { length:  14 }).unique().notNull(),
    registro: varchar('registro', { length:  11 }).unique().notNull(),
    isFisico: boolean('isFisico'),
    createdAt: timestamp('createdAt').defaultNow()
});

export const pessoaRelations = relations(pessoa, ({many}) => ({
    pessoaEndereco: many(pessoaEndereco)
}));

export const pessoaSelectSchema = createSelectSchema(pessoa);
export const pessoaInsertSchema = createInsertSchema(pessoa, {
    nome: z.string().min(3),
    email: z.string().email(),
    telefone: z.string(),
    cadastro: z.string().min(9).max(15),
    registro: z.string().min(7).max(11).nullable(),
    isFisico: z.boolean(),
});

export type Pessoa = InferSelectModel<typeof pessoa>;
export type InsertPessoa = InferInsertModel<typeof pessoa>;
