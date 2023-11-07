import { Request, Response } from "express";
import  { sql } from "drizzle-orm"
import { db } from "../../../db";
import { itemInsertSchema, itemTable } from "../schema";

export async function createItem(request: Request, response: Response){
    const data = request.body;

    const sqlQuery = db
        .insert(itemTable)
        .values({
            nome: sql.placeholder("nome"),
            valorUnitario: sql.placeholder("valorUnitario"),
            descricao: sql.placeholder("descricao"),
            quantidade: sql.placeholder("quantidade")
        })
        .prepare();

    try {
        const isValid = itemInsertSchema.safeParse(data);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const insertedItem = await sqlQuery.execute({
                nome: data.nome,
                valorUnitario: data.valorUnitario,
                descricao: data.descricao,
                unidadeMedidaId: data.unidadeMedidaId,
                quantidade: data.quantidade
            });
            if(!insertedItem) {
                transaction.rollback()
                return;
            }
            return insertedItem;
        })

        response.status(200)
            .json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}
