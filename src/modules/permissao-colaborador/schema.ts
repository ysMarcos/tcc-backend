import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { colaboradorTable } from "../colaborador/schema";
import { permissao } from "../permissao/schema";

export const permissaoColaborador = mysqlTable('permissao-colaborador', {
    id: int('id').autoincrement().primaryKey(),
    permissaoId: int('permissao_id').notNull().references(() => permissao.id),
    colaboradorId: int('colaborador_id').notNull().references(() => colaboradorTable.id)
})

export const permissaoColaboradorRelations = relations(permissaoColaborador, ({one}) => ({
    permissao: one(permissao, {
        fields: [permissaoColaborador.permissaoId],
        references: [permissao.id]
    }),
    colaborador: one(colaboradorTable, {
        fields: [permissaoColaborador.colaboradorId],
        references: [colaboradorTable.id]
    })
}))
