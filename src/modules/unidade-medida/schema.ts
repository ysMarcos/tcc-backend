import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const unidadeMedida = mysqlTable('unidade-medida', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).unique().notNull(),
    createdAt: timestamp('createdAt').defaultNow()
})
