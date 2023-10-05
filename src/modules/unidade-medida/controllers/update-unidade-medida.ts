import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { unidadeMedidaTable, unidadeMedidaInsertSchema } from "../schema";

export async function updateUnidadeMedida(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const data = request.body;

    const getUidadeMedidaQuery = db
    .select()
    .from(unidadeMedidaTable)
    .where(
        eq(
            unidadeMedidaTable.id, sql.placeholder("id")
        )
    )
    .prepare();

    try {
        const isValid = unidadeMedidaInsertSchema.safeParse(data);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [unidadeMedida] = await getUidadeMedidaQuery.execute({ id });
            if(!unidadeMedida) {
                transaction.rollback();
            }
            const updatedUnidadeMedida = await transaction
            .update(unidadeMedidaTable)
            .set({
                ...unidadeMedida,
                ...data
            })
            .where(
                eq(
                    unidadeMedidaTable.id, id
                )
            );
            return updatedUnidadeMedida;
        });
        return response.status(200).json(result);
    } catch(error){
        return response.status(404).json(error);
    }
}
