import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from 'zod';
import { pessoaEndereco } from "../pessoa-endereco/schema";

export const pessoaTable = mysqlTable('pessoa', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length:  150 }).notNull(),
    email: varchar('email', { length:  100 }).unique().notNull(),
    telefone: varchar('telefone', { length:  11 }).notNull(),
    cadastro: varchar('cadastro', { length:  14 }).unique().notNull(),
    registro: varchar('registro', { length:  11 }).unique(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const pessoaRelations = relations(pessoaTable, ({many}) => ({
    pessoaEndereco: many(pessoaEndereco)
}));

export const pessoaSelectSchema = createSelectSchema(pessoaTable);
export const pessoaInsertSchema = createInsertSchema(pessoaTable, {
    nome: z
        .string({
            required_error: "Nome is required"
        })
        .min(3),
    email: z
        .string({
            required_error: "Email is required"
        })
        .email("invalid Email"),
    telefone: z
        .string({
            required_error: "Telefone is required"
        })
        .regex(
            new RegExp("^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$"),
            "Telefone is invalid"
        ),
    cadastro: z
        .string({
            required_error: "Cadastro is required"
        })
        .min(11, { message: "Cadastro should be 11 or more characters long" })
        .max(15, { message: "Cadastro should be 15 or fewer characters long" }),
    registro: z
        .string()
        .min(7, { message: "Registro should be 7 or more characters long" })
        .max(11, { message: "Registro should be 11 or fewer characters long" })
        .nullable(),
});

export type Pessoa = InferSelectModel<typeof pessoaTable>;
