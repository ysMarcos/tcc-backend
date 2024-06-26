import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { char, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';
import { pessoaEnderecoTable } from "../pessoa-endereco/schema";

export const enderecoTable = mysqlTable('endereco', {
    id: int('id').autoincrement().primaryKey(),
    rua: varchar('rua', { length: 125 }).notNull(),
    numero: varchar('numero', { length: 6 }).notNull(),
    bairro: varchar('bairro', { length: 50 }).notNull(),
    cep: char('cep', { length: 8 }).notNull(),
    tipo: char('tipo', { length: 1, enum: ['U', 'R'] }),
    complemento: varchar('complemento', { length: 50 }),
    cidade: varchar('cidade', { length: 150 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const enderecoRelations = relations(enderecoTable, ({ many }) => ({
    pessoaEndereco: many(pessoaEnderecoTable)
}));

export const enderecoInsertSchema = createInsertSchema(enderecoTable, {
    rua: z
        .string({
            required_error: "Rua is required"
        })
        .min(3, { message: "Rua should be 3 or more characters long" })
        .max(125, { message: "Rua should be 125 or fewer characters long" }),
    numero: z
        .string({
            required_error: "Número is required"
        })
        .min(2, { message: "Número should be 2 or more characters long" })
        .max(6, { message: "Número should be 6 or fewer characters long" }),
    bairro: z
        .string({
            required_error: "Bairro is required"
        })
        .min(3, { message: "Bairro should be 3 or more characters long" })
        .max(50, { message: "Bairro should be 50 or fewer characters long" }),
    cep: z
        .string({
            required_error: "CEP is required"
        })
        .length(8, { message: "CEP must be exactly 8 characters long" }),
    tipo: z
        .enum(["R", "U"]),
    complemento: z
        .string()
        .max(50, { message: "Complemento should be 50 or fewer characters long" })
        .nullable(),
    cidade: z
        .string()
        .min(3, { message: "Cidade should be 3 or more characters long" })
        .max(150, { message: "Cidade should be 150 or fewer characters long" })
});
