import { boolean, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { colaboradorTable } from "../colaborador/schema";
import { clienteFornecedorTable } from "../cliente-fornecedor/schema";
import { relations } from "drizzle-orm";
import { prestacaoServicoTable } from "../servico-prestacao/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const prestacaoTable = mysqlTable("prestacao", {
    id: int('id').autoincrement().primaryKey(),
    descricao: varchar('descricao', { length: 150 }),
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

export const prestacaoInsertSchema = createInsertSchema(prestacaoTable, {
    clienteFornecedorId: z
        .number({
            required_error: "ClienteFornecedor must an number"
        }),
    colaboradorId: z
    .number({
        required_error: "ClienteFornecedor must an number"
    }),
    descricao: z
        .string()
        .min(3, { message: "Descrição must be 3 or more characters long" })
        .max(150, { message: "Descricao must be 150 or fewer characters long" })
        .optional()
})

export const prestacaoUpdateSchema = createInsertSchema(prestacaoTable, {
    clienteFornecedorId: z
        .number({
            required_error: "ClienteFornecedor must an number"
        })
        .optional(),
    colaboradorId: z
        .number({
            required_error: "ClienteFornecedor must an number"
        })
        .optional(),
    descricao: z
        .string()
        .min(3, { message: "Descrição must be 3 or more characters long" })
        .max(150, { message: "Descricao must be 150 or fewer characters long" })
        .optional()
})
