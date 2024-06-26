import { eq, sql } from "drizzle-orm";
import {Request, Response} from "express";
import { db } from "../../../db";
import { itemTable, itemUpdateSchema } from "../schema";
import { itemCategoriaTable } from "../../item-categoria/schema";

export async function updateItem(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const data = request.body;

    const categoriaId = Number(data.categoriaId);

    let newData: Record<string, string> = {};
    if(data.nome && data.nome.length >= 3) newData.nome = data.nome;
    if(data.descricao && data.descricao.length >= 3) newData.descricao = data.descricao;
    if(data.valor && data.valor >= 0) newData.valor = data.valor;
    if(data.quantidade && data.quantidade >= 0) newData.quantidade = data.quantidade;

    const getItemQuery = db
    .select()
    .from(itemTable)
    .where(eq(
        itemTable.id, sql.placeholder("id")
    ))
    .prepare();

    const insertItemCategoria = db
    .insert(itemCategoriaTable)
    .values({
        itemId: sql.placeholder("itemId"),
        categoriaId: sql.placeholder("categoriaId")
    })
    .prepare()

    try {
        const isValid = itemUpdateSchema.safeParse(newData);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [item] = await getItemQuery.execute({ id });
            if(!item) {
                transaction.rollback();
            }
            const [result] = await transaction
            .update(itemTable)
            .set({
                ...item,
                ...newData
            })
            .where(
                eq(
                    itemTable.id, id
                )
            );

            if(categoriaId){
                await insertItemCategoria.execute({
                    itemId: item.id,
                    categoriaId
                })
            }

            return result;
        });
        return response.status(200).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
