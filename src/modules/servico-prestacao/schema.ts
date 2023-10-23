import { float, int, mysqlTable, timestamp } from "drizzle-orm/mysql-core";
import { prestacaoTable } from "../prestacao/schema";
import { servicoTable } from "../servico/schema";
import { relations } from "drizzle-orm";

export const prestacaoServicoTable = mysqlTable("prestacao_servico", {
    id: int('id').autoincrement().primaryKey(),
    valorCobrado: float('valor_cobrado').notNull(),
    prestacaoId: int('prestacao_id').references(() => prestacaoTable.id).notNull(),
    servicoId: int('servico_id').references(() => servicoTable.id).notNull(),
    createdAt: timestamp('createdAt').defaultNow()
})

export const prestacaoServicoRelations = relations(prestacaoServicoTable, ({ one }) => ({
    prestacao: one(prestacaoTable, {
        fields: [prestacaoServicoTable.prestacaoId],
        references: [prestacaoTable.id]
    }),
    servico: one(servicoTable, {
        fields: [prestacaoServicoTable.servicoId],
        references: [servicoTable.id]
    })
}))
