import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const servicoTable = mysqlTable('servico', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique(),
    createdAt: timestamp('createdAt').defaultNow()
});
