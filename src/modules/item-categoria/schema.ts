import { relations } from "drizzle-orm";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { categoriaTable } from "../categoria/schema";
import { itemTable } from "../item/schema";

export const itemCategoriaTable = mysqlTable("item_categoria", {
    id: int('id').autoincrement().primaryKey(),
    itemId: int('item_id').notNull().references(() => itemTable.id),
    categoriaId:int('categoria_id').notNull().references(() => categoriaTable.id)
})

export const itemCategoriaRelations = relations(itemCategoriaTable, ({one}) => ({
    item: one(itemTable, {
        fields: [itemCategoriaTable.itemId],
        references: [itemTable.id]
    }),
    categoria: one(categoriaTable, {
        fields: [itemCategoriaTable.categoriaId],
        references: [categoriaTable.id]
    })
}))
