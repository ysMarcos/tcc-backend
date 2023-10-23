import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { colaboradorTable } from "../colaborador/schema";
import { clienteFornecedorTable } from "../cliente-fornecedor/schema";
import { relations } from "drizzle-orm";
import { prestacaoServicoTable } from "../servico-prestacao/schema";

export const prestacaoTable = mysqlTable("prestacao", {
    id: int('id').autoincrement().primaryKey(),
    descricao: varchar('nota_fiscal', { length: 150 }).notNull(),
    colaboradorId: int('colaborador_id').references(() => colaboradorTable.id).notNull(),
    clienteFornecedorId: int('cliente_fornecedor_id').references(() => clienteFornecedorTable.id).notNull(),
    createdAt: timestamp('createdAt').defaultNow()
})

export const prestacaoRelations = relations(prestacaoTable, ({ one, many }) => ({
    colaborador: one(colaboradorTable, {
        fields: [prestacaoTable.colaboradorId],
        references: [colaboradorTable.id]
    }),
    clienteFornecedor: one(clienteFornecedorTable, {
        fields: [prestacaoTable.clienteFornecedorId],
        references: [clienteFornecedorTable.id]
    }),
    servicoPrestacao: many(prestacaoServicoTable)
}))
