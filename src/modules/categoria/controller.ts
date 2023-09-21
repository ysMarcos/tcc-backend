import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { Categoria, categoriaTable, categoriaInsertSchema } from "./schema";

export async function createCategoria(request: Request, response: Response, next: NextFunction) {
    try {
    const newCategoriaData = request.body;

    const isValid = categoriaInsertSchema.safeParse(newCategoriaData);
    if(!isValid.success) return response.status(400).json(isValid.error.issues);

    const newCategoria = await db
    .insert(categoriaTable)
    .values(newCategoriaData)

    response.status(200).json(newCategoria);
    } catch(error) {
        next(error)
    }
}

export async function getCategoriaById(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const selectCategoria = await db
        .select()
        .from(categoriaTable)
        .where(eq(categoriaTable.id, id))
        .limit(1);

        response.status(200).json(selectCategoria);
    } catch(error) {
        next(error);
    }
}

export async function listCategoria(request: Request, response: Response, next: NextFunction) {
    try {
        const categorias = await db
        .select()
        .from(categoriaTable)
        .orderBy(categoriaTable.nome);

        response.status(200).json(categorias);
    } catch(error) {
        next(error);
    }
}

export async function updateCategoria(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);
        const newData = request.body;

        const categoriaData: Categoria[] = await db
        .select()
        .from(categoriaTable)
        .where(eq(categoriaTable.id, id));

        const categoriaUpdate = await db
        .update(categoriaTable)
        .set({
            ...categoriaData[0],
            ...newData
        })

        response.status(200).json(categoriaUpdate);
    } catch(error) {
        next(error);
    }
}

export async function deleteCategoria(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const deletedCategoria = await db
        .delete(categoriaTable)
        .where(eq(categoriaTable.id, id));

        return response.status(200).json(deletedCategoria);
    } catch (error){
        next(error);
    }
}
