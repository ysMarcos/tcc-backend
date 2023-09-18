import { like, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { item } from "../schema";

export async function listItem(request: Request, response: Response) {
    const { params } = request;
    const { nome, limit, page } = params;
    const nomeReference = `%${nome}%`;

    const limitReference = Number(limit);
    const pageReference = Number(page);
    const offset = limitReference * pageReference;

    const query = db
    .select()
    .from(item)
    .where(like(item.nome, sql.placeholder("nome")))
    .orderBy(item.nome)
    .limit(limitReference)
    .offset(offset)
    .prepare();

    try {
        const itemData = await query.execute({ nome: nomeReference });
        response.status(200).json(itemData);
    } catch(error){
        return response.status(500).json(error);
    }
}
