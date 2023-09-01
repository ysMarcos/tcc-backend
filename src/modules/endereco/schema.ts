import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { char, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';
import { cidade } from "../cidade/schema";
import { pessoaEndereco } from "../pessoa-endereco/schema";

export const endereco = mysqlTable('endereco', {
    id: int('id').autoincrement().primaryKey(),
    rua: varchar('rua', { length: 125 }).notNull(),
    numero: varchar('numero', { length: 6 }).notNull(),
    bairro: varchar('bairro', { length: 50 }).notNull(),
    cep: char('cep', { length: 8 }).notNull(),
    tipo: char('tipo', { length: 1, enum: ['U', 'R'] }),
    complemento: varchar('complemento', { length: 50 }),
    cidadeId: int('cidade_id').references(() => cidade.id),
    createdAt: timestamp('createdAt').defaultNow()
});

export const enderecoRelations = relations(endereco, ({ one, many }) => ({
    cidade: one(cidade, {
        fields: [endereco.cidadeId],
        references: [cidade.id]
    }),
    pessoaEndereco: many(pessoaEndereco)
}));

export const enderecoInsertSchema = createInsertSchema(endereco, {
    rua: z
        .string({
            required_error: "Endereço não preenchido"
        })
        .min(3)
        .max(125, "Número máximo de caracteres ultrapassado"),
    numero: z
        .string({
            required_error: "Número não preenchido"
        })
        .min(2)
        .max(6, "Número máximo de caracteres ultrapassado"),
    bairro: z
        .string({
            required_error: "Bairro não preenchido"
        })
        .min(3)
        .max(50),
    cep: z
        .string({
            required_error: "CEP não preenchido"
        })
        .length(8),
    tipo: z
        .enum(["rural", "urbano"]),
    complemento: z
        .string()
        .max(50)
        .nullable(),
})

export type Endereco = InferSelectModel<typeof endereco>;
export type InsertEndereco = InferInsertModel<typeof endereco>;
