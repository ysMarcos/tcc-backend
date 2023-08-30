import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { endereco } from "../endereco/schema";

export const cidade = mysqlTable('cidade', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).unique()
});

export const cidadeRelations = relations(cidade, ({many}) => ({
    enderecos: many(endereco)
}));

export type Cidade = InferSelectModel<typeof cidade>;
export type InsertCidade = InferInsertModel<typeof cidade>;
