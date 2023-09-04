import { and, eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { categoria } from "../categoria/schema";
import { item } from "../item/schema";
import { unidadeMedida } from "../unidade-medida/schema";
import { itemCategoria } from "./schema";

export async function addItemToCategoria (request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const itemId = Number(params.itemId);
        const categoriaId = Number(params.categoriaId);

        const itemToCategoria = await db
        .insert(itemCategoria)
        .values({
            itemId,
            categoriaId
        })

        return response.status(200).json(itemToCategoria);
    } catch(error){
        next(error);
    }
}

export async function listItemCategoria(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const categoriaId = Number(params.categoriaId);

        const resultItemCategoria = await db
        .select({
            item: item.nome,
            valor: item.valorUnitario,
            unidadeMedida: unidadeMedida.nome
        })
        .from(itemCategoria)
        .innerJoin(categoria, eq(itemCategoria.categoriaId, categoria.id))
        .innerJoin(item, eq(itemCategoria.itemId, item.id))
        .innerJoin(unidadeMedida, eq(unidadeMedida.id, item.unidadeMedidaId))
        .where(eq(categoria.id, categoriaId));

        response.status(200).json(resultItemCategoria);
    } catch (error) {
        next(error);
    }
}

export async function removeItemFromCategoria(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const itemId = Number(params.itemId);
        const categoriaId = Number(params.categoriaId);

        const removedItemFromCategoria = await db
        .delete(itemCategoria)
        .where(
            and(
                eq(itemCategoria.itemId, itemId),
                eq(itemCategoria.categoriaId, categoriaId)
            )
        )
        response.status(200).json(removedItemFromCategoria);
    } catch (error) {
        next(error)
    }
}