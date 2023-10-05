import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { colaboradorTable } from "../colaborador/schema";
import { permissaoTable } from "../permissao/schema";

export const permissaoColaborador = mysqlTable('permissao-colaborador', {
    id: int('id').autoincrement().primaryKey(),
    permissaoId: int('permissao_id').notNull().references(() => permissaoTable.id),
    colaboradorId: int('colaborador_id').notNull().references(() => colaboradorTable.id)
})

export const permissaoColaboradorRelations = relations(permissaoColaborador, ({one}) => ({
    permissao: one(permissaoTable, {
        fields: [permissaoColaborador.permissaoId],
        references: [permissaoTable.id]
    }),
    colaborador: one(colaboradorTable, {
        fields: [permissaoColaborador.colaboradorId],
        references: [colaboradorTable.id]
    })
}))
