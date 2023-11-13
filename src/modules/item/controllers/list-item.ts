import { and, between, like, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../schema";

export async function listItem(request: Request, response: Response) {
    const { query } = request;
    const { nome, limit, page } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
    .select(
        {
            id: itemTable.id,
            nome: itemTable.nome,
            valor: itemTable.valorUnitario,
            quantidade: itemTable.quantidade
        }
    )
    .from(itemTable)
    .where(
        and(
            like(itemTable.nome, sql.placeholder("nome"))
        )
    )
    .orderBy(
        itemTable.nome,
        itemTable.valorUnitario
    )
    .limit(limitReference)
    .offset(offset)
    .prepare();

    try {
        const itens = await sqlQuery.execute({
            nome: `%${nome}%`,
        });
        response.status(200).json(itens);
    } catch(error){
        return response.status(400).json(error);
    }
}
