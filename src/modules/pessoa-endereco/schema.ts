import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { endereco } from "../endereco/schema";
import { pessoaTable } from "../pessoa/schema";

export const pessoaEnderecoTable = mysqlTable('pessoa_endereco', {
    id: int('id').autoincrement().primaryKey(),
    pessoaId: int('pessoa_id').notNull().references(() => pessoaTable.id),
    enderecoId: int('endereco_id').notNull().references(() => endereco.id)
});

export const pessoaEnderecoRelations = relations(pessoaEnderecoTable, ({one}) => ({
    pessoa: one(pessoaTable, {
        fields: [pessoaEnderecoTable.pessoaId],
        references: [pessoaTable.id]
    }),
    endereco: one(endereco, {
        fields: [pessoaEnderecoTable.enderecoId],
        references: [endereco.id]
    })
}))
