import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { categoriaTable, categoriaUpdateSchema } from "../schema";

export async function updateCategoria(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const requestData = request.body;

    let newData: Record<string, string> = {};
    if(requestData.nome && requestData.nome.length >= 3) newData.nome = requestData.nome;

    const getCategoriaQuery = db
    .select()
    .from(categoriaTable)
    .where(
        eq(
            categoriaTable.id, sql.placeholder("id")
        )
    )
    .prepare();

    try {
        const isValid = categoriaUpdateSchema.safeParse(newData);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [categoria] = await getCategoriaQuery.execute({ id });
            if(!categoria) {
                transaction.rollback();
            }
            const updatedCategoria = await transaction
            .update(categoriaTable)
            .set({
                ...categoria,
                ...newData
            })
            .where(
                eq(
                    categoriaTable.id, id
                )
            );
            return updatedCategoria;
        });
        return response.status(200).json(result);
    } catch(error){
        return response.status(404).json(error);
    }
}
