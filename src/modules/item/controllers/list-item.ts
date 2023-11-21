import { eq, and, between, like, sql, isNotNull, or } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { itemTable } from "../schema";
import { itemCategoriaTable } from "../../item-categoria/schema";
import { categoriaTable } from "../../categoria/schema";

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
        like(itemTable.nome, sql.placeholder("nome"))
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
            nome: `%${nome}%`
        });
        response.status(200).json(itens);
    } catch(error){
        return response.status(400).json(error);
    }
}

export async function listItemCategoria(request: Request, response: Response) {
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
            quantidade: itemTable.quantidade,
            categoria: categoriaTable.nome
        }
    )
    .from(itemCategoriaTable)
    .innerJoin(
        categoriaTable,
        eq( 
            categoriaTable.id, itemCategoriaTable.categoriaId
        )
    )
    .innerJoin(
        itemTable,
        eq( 
            itemTable.id, itemCategoriaTable.itemId
        )
    )
    .where(
        like(categoriaTable.nome, sql.placeholder("nome"))
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
            nome: `%${nome}%`
        });
        response.status(200).json(itens);
    } catch(error){
        return response.status(400).json(error);
    }
}
