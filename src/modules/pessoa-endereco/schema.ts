import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { endereco } from "../endereco/schema";
import { pessoa } from "../pessoa/schema";

export const pessoaEndereco = mysqlTable('pessoa_endereco', {
    id: int('id').autoincrement().primaryKey(),
    pessoaId: int('pessoa_id').notNull().references(() => pessoa.id),
    enderecoId: int('endereco_id').notNull().references(() => endereco.id)
});

export const pessoaEnderecoRelations = relations(pessoaEndereco, ({one}) => ({
    pessoa: one(pessoa, {
        fields: [pessoaEndereco.pessoaId],
        references: [pessoa.id]
    }),
    endereco: one(endereco, {
        fields: [pessoaEndereco.enderecoId],
        references: [endereco.id]
    })
}))
