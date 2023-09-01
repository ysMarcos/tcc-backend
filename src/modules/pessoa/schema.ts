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
    nome: z
        .string({
            required_error: "Nome não preenchido"
        })
        .min(3),
    email: z
        .string({
            required_error: "Email não preenchido"
        })
        .email("invalid Email"),
    telefone: z
        .string({
            required_error: "Telefone não preenchido"
        })
        .regex(
            new RegExp("^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$"),
            "Telefone inválido"
        ),
    cadastro: z
        .string({
            required_error: "Cadastro não preenchido"
        })
        .min(9)
        .max(15),
    registro: z
        .string()
        .min(7)
        .max(11)
        .nullable(),
    isFisico: z
        .boolean(),
});

export type Pessoa = InferSelectModel<typeof pessoa>;
