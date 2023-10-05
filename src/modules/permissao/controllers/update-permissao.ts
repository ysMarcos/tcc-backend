import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { permissaoTable, permissaoInsertSchema } from "../schema";

export async function updatePermissao(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const data = request.body;

    const getUidadeMedidaQuery = db
    .select()
    .from(permissaoTable)
    .where(
        eq(
            permissaoTable.id, sql.placeholder("id")
        )
    )
    .prepare();

    try {
        const isValid = permissaoInsertSchema.safeParse(data);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [permissao] = await getUidadeMedidaQuery.execute({ id });
            if(!permissao) {
                transaction.rollback();
            }
            const updatedPermissao = await transaction
            .update(permissaoTable)
            .set({
                ...permissao,
                ...data
            })
            .where(
                eq(
                    permissaoTable.id, id
                )
            );
            return updatedPermissao;
        });
        return response.status(200).json(result);
    } catch(error){
        return response.status(404).json(error);
    }
}
