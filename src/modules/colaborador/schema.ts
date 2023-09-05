import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, datetime, int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from 'zod';
import { pessoa } from "../pessoa/schema";

export const colaborador = mysqlTable("colaborador", {
    id: int('id').autoincrement().primaryKey(),
    usuario: varchar('usuario', { length: 50 }),
    senha: varchar('senha', { length: 250 }),
    dataInicio: datetime('data_inicio_contrato'),
    dataPrevisaoFim: datetime('data_previsao_fim'),
    ativo: boolean('ativo').default(true),
    pessoaId: int('pessoa_id').references(() => pessoa.id),
    createdAt: timestamp('createdAt').defaultNow()
})

export const colaboradorRelations = relations(colaborador, ({ one }) => ({
    pessoaId: one(pessoa, {
        fields: [colaborador.pessoaId],
        references: [pessoa.id]
    })
}))

export const colaboradorInsertSchema = createInsertSchema(colaborador, {
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
        .date({
            required_error: "Data Inicio is required"
        }),
    dataPrevisaoFim: z
        .date({
            required_error: "Data Previsão Fim is required"
        }),
    ativo: z
        .boolean({
            invalid_type_error: "Ativo should be true or false"
        })
})

export const colaboradorSelectSchema = createSelectSchema(colaborador, {
    id: z.number(),
    usuario: z.string(),
    senha: z.string().optional(),
    dataInicio: z.date(),
    dataPrevisaoFim: z.date(),
    ativo: z.boolean(),
    pessoaId: z.number()
})
