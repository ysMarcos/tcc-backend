import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { endereco } from "../endereco/schema";

export const cidade = mysqlTable('cidade', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).unique().notNull(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const cidadeRelations = relations(cidade, ({many}) => ({
    enderecos: many(endereco)
}));

export type Cidade = InferSelectModel<typeof cidade>;
export type InsertCidade = InferInsertModel<typeof cidade>;
