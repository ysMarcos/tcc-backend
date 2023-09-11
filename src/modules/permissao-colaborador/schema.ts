import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { colaborador } from "../colaborador/schema";
import { permissao } from "../permissao/schema";

export const permissaoColaborador = mysqlTable('permissao-colaborador', {
    id: int('id').autoincrement().primaryKey(),
    permissaoId: int('permissao_id').notNull().references(() => permissao.id),
    colaboradorId: int('colaborador_id').notNull().references(() => colaborador.id)
})

export const permissaoColaboradorRelations = relations(permissaoColaborador, ({one}) => ({
    permissao: one(permissao, {
        fields: [permissaoColaborador.permissaoId],
        references: [permissao.id]
    }),
    colaborador: one(colaborador, {
        fields: [permissaoColaborador.colaboradorId],
        references: [colaborador.id]
    })
}))
