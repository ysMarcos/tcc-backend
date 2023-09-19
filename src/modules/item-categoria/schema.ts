import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { categoria } from "../categoria/schema";
import { itemTable } from "../item/schema";

export const itemCategoria = mysqlTable("item_categoria", {
    id: int('id').autoincrement().primaryKey(),
    itemId: int('item_id').notNull().references(() => itemTable.id),
    categoriaId:int('categoria_id').notNull().references(() => categoria.id)
})

export const itemCategoriaRelations = relations(itemCategoria, ({one}) => ({
    item: one(itemTable, {
        fields: [itemCategoria.itemId],
        references: [itemTable.id]
    }),
    categoria: one(categoria, {
        fields: [itemCategoria.categoriaId],
        references: [categoria.id]
    })
}))
