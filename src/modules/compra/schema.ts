import { relations } from "drizzle-orm";
import { int, datetime, mysqlTable, timestamp, float, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { colaboradorTable } from "../colaborador/schema";
import { z } from "zod";
import { clienteFornecedorTable } from "../cliente-fornecedor/schema";
//TODO: mudar o campo valorTotal para valorCompra
export const compraTable = mysqlTable("compra", {
    id: int('id').autoincrement().primaryKey(),
    nf: varchar('nota_fiscal', { length: 150 }).notNull(),
    dataCompra: datetime('data_compra').notNull(),
    valorTotal: float('valor_toal').notNull(),
    colaboradorId: int('colaborador_id').references(() => colaboradorTable.id).notNull(),
    clienteFornecedorId: int('cliente_fornecedor_id').references(() => clienteFornecedorTable.id).notNull(),
    createdAt: timestamp('createdAt').defaultNow()
})

export const vendaRelations = relations(compraTable, ({ one }) => ({
    colaborador: one(colaboradorTable, {
        fields: [compraTable.colaboradorId],
        references: [colaboradorTable.id]
    }),
    clienteFornecedor: one(clienteFornecedorTable, {
        fields: [compraTable.clienteFornecedorId],
        references: [clienteFornecedorTable.id]
    })
}))
