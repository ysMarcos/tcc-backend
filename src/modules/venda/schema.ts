import { relations } from "drizzle-orm";
import { int, datetime, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import { clienteFornecedor } from "../cliente-fornecedor/schema";
import { colaboradorTable } from "../colaborador/schema";

export const venda = mysqlTable("venda", {
    id: int('id').autoincrement().primaryKey(),
    dataVenda: datetime('data_venda').notNull(),
    colaboradorId: int('colaborador_id').references(() => colaboradorTable.id).notNull(),
    clienteFornecedorId: int('cliente_fornecedor_id').references(() => clienteFornecedor.id).notNull(),
    createdAt: timestamp('createdAt').defaultNow()
})

export const vendaRelations = relations(venda, ({ one }) => ({
    colaborador: one(colaboradorTable, {
        fields: [venda.colaboradorId],
        references: [colaboradorTable.id]
    }),
    clienteFornecedor: one(clienteFornecedor, {
        fields: [venda.clienteFornecedorId],
        references: [clienteFornecedor.id]
    })
}))
