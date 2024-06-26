import { Request, Response } from "express";
import  { sql } from "drizzle-orm"
import { db } from "../../../db";
import { itemInsertSchema, itemTable } from "../schema";
import { itemCategoriaTable } from "../../item-categoria/schema";

export async function createItem(request: Request, response: Response){
    const data = request.body;
    const categoriaId = Number(data.categoriaId);

    const sqlQuery = db
        .insert(itemTable)
        .values({
            nome: sql.placeholder("nome"),
            valorUnitario: sql.placeholder("valorUnitario"),
            descricao: sql.placeholder("descricao"),
            quantidade: sql.placeholder("quantidade")
        })
        .prepare();
    
    const insertItemCategoria = db
        .insert(itemCategoriaTable)
        .values({
            itemId: sql.placeholder("itemId"),
            categoriaId: sql.placeholder("categoriaId")
        })
        .prepare()
    
    try {
        const isValid = itemInsertSchema.safeParse(data);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [result] = await sqlQuery.execute({
                nome: data.nome,
                valorUnitario: data.valorUnitario,
                descricao: data.descricao,
                quantidade: data.quantidade
            });
            if(!result) transaction.rollback();
            
            if(categoriaId){
                await insertItemCategoria.execute({
                    itemId: result.insertId,
                    categoriaId
                })
            }
            return result;
        })

        response.status(200)
            .json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
