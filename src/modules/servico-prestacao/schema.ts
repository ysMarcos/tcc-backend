import { boolean, date, float, int, mysqlTable, time, timestamp } from "drizzle-orm/mysql-core";
import { prestacaoTable } from "../prestacao/schema";
import { servicoTable } from "../servico/schema";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { itemPrestacaoServicoTable } from "../item-prestacao-servico/schema";

export const prestacaoServicoTable = mysqlTable("prestacao_servico", {
    id: int('id').autoincrement().primaryKey(),
    valorCobrado: float('valor_cobrado').notNull(),
    prestacaoId: int('prestacao_id').references(() => prestacaoTable.id).notNull(),
    servicoId: int('servico_id').references(() => servicoTable.id).notNull(),
    dataInicio: date('data_inicio').notNull(),
    dataFim: date('data_fim').notNull(),
    isPago: boolean('isPago').default(false),
    status: boolean('status').default(false),
    createdAt: timestamp('createdAt').defaultNow()
})

export const prestacaoServicoRelations = relations(prestacaoServicoTable, ({ one, many }) => ({
    prestacao: one(prestacaoTable, {
        fields: [prestacaoServicoTable.prestacaoId],
        references: [prestacaoTable.id]
    }),
    servico: one(servicoTable, {
        fields: [prestacaoServicoTable.servicoId],
        references: [servicoTable.id]
    }),
    itemPrestacaoServico: many(itemPrestacaoServicoTable)
}))

export const prestacaoServicoInsertSchema = createInsertSchema(prestacaoServicoTable, {
    valorCobrado: z
        .number({
            required_error: "valorCobrado must an number"
        }),
    prestacaoId: z
        .number({
            required_error: "prestacaoId must an number"
        }),
    servicoId: z
        .number({
            required_error: "servicoId must an number"
        }),
    dataInicio: z
        .number({
            required_error: "dataInicio must a date"
        }),
    dataFim: z
        .date({
            required_error: "dataFim must a date"
        }),
    isPago: z
        .boolean({
            required_error: "isPago must 0 or 1"
        })
        .optional(),
    status: z
        .boolean({
            required_error: "status must 0 or 1"
        })
        .optional(),
})

export const prestacaoServicoUpdateSchema = createInsertSchema(prestacaoServicoTable, {
    valorCobrado: z
        .number({
            required_error: "valorCobrado must an number"
        })
        .optional(),
    prestacaoId: z
        .number({
            required_error: "prestacaoId must an number"
        })
        .optional(),
    servicoId: z
        .number({
            required_error: "servicoId must an number"
        })
        .optional(),
    dataInicio: z
        .number({
            required_error: "dataInicio must a date"
        })
        .optional(),
    dataFim: z
        .date({
            required_error: "dataFim must a date"
        })
        .optional(),
    isPago: z
        .boolean({
            required_error: "isPago must 0 or 1"
        })
        .optional(),
    status: z
        .boolean({
            required_error: "status must 0 or 1"
        })
        .optional(),
})
