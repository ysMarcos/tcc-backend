import { relations } from "drizzle-orm";
import { float, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { unidadeMedida } from "../unidade-medida/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from 'zod';

export const item = mysqlTable('item', {
    id: int('id').autoincrement().primaryKey(),
    nome: varchar('nome', { length: 50 }).notNull().unique(),
    valorUnitario: float('valor_unitario').notNull(),
    unidadeMedidaId: int('unidade_medida_id').notNull().references(() => unidadeMedida.id)
})

export const itemRelations = relations(item, ({ one }) => ({
    unidadeMedida: one(unidadeMedida, {
        fields: [item.unidadeMedidaId],
        references: [unidadeMedida.id]
    })
}))

export const itemInsertSchema = createInsertSchema(item, {
    nome: z.string().min(3).max(50),
    valorUnitario: z.number().positive()
})
