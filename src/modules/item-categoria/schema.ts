import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { categoria } from "../categoria/schema";
import { item } from "../item/schema";

export const itemCategoria = mysqlTable("item_categoria", {
    itemId: int('item_id').notNull().references(() => item.id),
    categoriaId:int('categoria_id').notNull().references(() => categoria.id)
})

export const itemCategoriaRelations = relations(itemCategoria, ({one}) => ({
    item: one(item, {
        fields: [itemCategoria.itemId],
        references: [item.id]
    }),
    categoria: one(categoria, {
        fields: [itemCategoria.categoriaId],
        references: [categoria.id]
    })
}))
