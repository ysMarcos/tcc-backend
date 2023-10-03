import { relations } from "drizzle-orm";
import { boolean, datetime, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';
import { permissaoColaborador } from "../permissao-colaborador/schema";
import { pessoaTable } from "../pessoa/schema";

export const colaboradorTable = mysqlTable("colaborador", {
    id: int('id').autoincrement().primaryKey(),
    usuario: varchar('usuario', { length: 50 }).notNull().unique(),
    senha: varchar('senha', { length: 250 }).notNull(),
    dataInicio: datetime('data_inicio_contrato').notNull(),
    dataPrevisaoFim: datetime('data_previsao_fim').notNull(),
    ativo: boolean('ativo').default(true),
    pessoaId: int('pessoa_id').references(() => pessoaTable.id),
    createdAt: timestamp('createdAt').defaultNow()
})

export const colaboradorRelations = relations(colaboradorTable, ({ one, many }) => ({
    pessoaId: one(pessoaTable, {
        fields: [colaboradorTable.pessoaId],
        references: [pessoaTable.id]
    }),
    permissaoColaborador: many(permissaoColaborador)
}))

export const colaboradorInsertSchema = createInsertSchema(colaboradorTable, {
    usuario: z
        .string({
            required_error: "Usuario is required"
        })
        .min(3, {
            message: "Usuario should be 3 or more characters long"
        })
        .max(50, {
            message: "Usuario should be 50 or fewer characters long"
        }),
    senha: z
        .string({
            required_error: "Senha is required"
        })
        .min(3, {
            message: "Senha should be 3 or more characters long"
        }),
    dataInicio: z
        .coerce
        .date({
            required_error: "Data Inicio is required"
        }),
    dataPrevisaoFim: z
        .coerce
        .date({
            required_error: "Data Previsão Fim is required"
        }),
    ativo: z
        .boolean({
            invalid_type_error: "Ativo should be true or false"
        })
})

export const colaboradorUpdateSchema = createInsertSchema(colaboradorTable, {
    usuario: z
        .string({
            required_error: "Usuario is required"
        })
        .min(3, {
            message: "Usuario should be 3 or more characters long"
        })
        .max(50, {
            message: "Usuario should be 50 or fewer characters long"
        })
        .optional(),
    senha: z
        .string({
            required_error: "Senha is required"
        })
        .min(3, {
            message: "Senha should be 3 or more characters long"
        })
        .optional(),
    dataInicio: z
        .coerce
        .date({
            required_error: "Data Inicio is required"
        })
        .optional(),
    dataPrevisaoFim: z
        .coerce
        .date({
            required_error: "Data Previsão Fim is required"
        })
        .optional(),
    ativo: z
        .boolean({
            invalid_type_error: "Ativo should be true or false"
        })
        .optional()
})

