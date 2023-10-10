import { relations } from "drizzle-orm";
import { boolean, datetime, int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { pessoaTable } from "../pessoa/schema";

export const clienteFornecedorTable = mysqlTable('cliente-fornecedor', {
    id: int('id').autoincrement().primaryKey(),
    isCliente: boolean('isCliente').notNull(),
    pessoaId: int('pessoa_id').references(() => pessoaTable.id),
    createdAt: timestamp('createdAt').defaultNow()
})

export const clienteFornecedorRelations = relations(clienteFornecedorTable, ({one}) => ({
    pessoaId: one(pessoaTable, {
        fields: [clienteFornecedorTable.pessoaId],
        references: [pessoaTable.id]
    })
}))

export const clienteFornecedorInsertSchema = createInsertSchema(clienteFornecedorTable, {
    isCliente: z
        .boolean({
            invalid_type_error: "isCliente should be true or false"
        })
});

export const clienteFornecedorUpdateSchema = createInsertSchema(clienteFornecedorTable, {
    isCliente: z
        .boolean({
            invalid_type_error: "isCliente should be true or false"
        })
        .optional()
});
