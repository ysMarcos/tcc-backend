import { relations } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { prestacaoServicoTable } from "../servico-prestacao/schema";

export const servicoTable = mysqlTable('servico', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow()
});

export const servicoRelations = relations(servicoTable, ({ many }) => ({
    servicoPrestacao: many(prestacaoServicoTable)
}))
