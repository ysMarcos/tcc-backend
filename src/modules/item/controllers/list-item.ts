import { and, between, eq, gt, isNotNull, like, or, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../schema";

export async function listItem(request: Request, response: Response) {
    const { query } = request;
    const { nome, limit, page, valorMin, valorMax } = query;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = ( pageReference - 1 ) * limitReference;

    const sqlQuery = db
    .select()
    .from(itemTable)
    .where(
        and(
            like(itemTable.nome, sql.placeholder("nome")),
            between(
                itemTable.valorUnitario,
                sql.placeholder("valorMin"), sql.placeholder("valorMax")
            )
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
            valorMin: Number(valorMin),
            valorMax: Number(valorMax)
        });
        response.status(200).json(itens);
    } catch(error){
        return response.status(500).json(error);
    }
}
