import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { char, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
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

export type Endereco = InferSelectModel<typeof endereco>;
export type InsertEndereco = InferInsertModel<typeof endereco>;
