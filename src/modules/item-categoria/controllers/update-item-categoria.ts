import { eq, sql } from 'drizzle-orm';
import { Request, Response } from 'express';
import { db } from '../../../db';
import { itemCategoriaTable } from '../schema';
//TODO: ajeitar delete e update de item categoria
export async function funcao(request: Request, response: Response){
    const { params, body } = request;
    const itemId = Number(params.itemId);
    const data = body;

    const selectItemQuery = db
        .select()
        .from(itemCategoriaTable)
        .where(
            eq(itemCategoriaTable.itemId, sql.placeholder("itemId"))
        )
        .prepare();

    try {
        if(data.categoriaId !== Number) return response.status(400).json({ message: "CategoriaId must be an Number" });
        const result = await db.transaction(async (transaction) => {
            const [item] = await selectItemQuery.execute({ itemId });
            if (!item) {
                transaction.rollback();
                return;
            }
            const result = await db
                .update(itemCategoriaTable)
                .set({
                    ...item,
                    ...data
                })
                .where(eq(itemCategoriaTable.itemId, itemId));
            return result;
        })
        return response.status(200).json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
