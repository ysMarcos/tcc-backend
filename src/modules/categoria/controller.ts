import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { Categoria, categoria, categoriaInsertSchema } from "./schema";

export async function createCategoriaController(request: Request, response: Response, next: NextFunction) {
    try {
    const newCategoriaData = request.body;

    const isValid = categoriaInsertSchema.safeParse(newCategoriaData);
    if(!isValid.success) response.status(400).json(isValid.error.issues);

    const newCategoria = await db
    .insert(categoria)
    .values(newCategoriaData)

    response.status(200).json(newCategoria);

    } catch(error) {
        next(error)
    }
}

export async function getCategoriaByIdController(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const selectCategoria = await db
        .select()
        .from(categoria)
        .where(eq(categoria.id, id))
        .limit(1);

        response.status(200).json(selectCategoria);
    } catch(error) {
        next(error);
    }
}

export async function listCategoriaController(request: Request, response: Response, next: NextFunction) {
    try {
        const categorias = await db
        .select()
        .from(categoria)
        .orderBy(categoria.nome);

        response.status(200).json(categorias);
    } catch(error) {
        next(error);
    }
}

export async function updateCategoriaController(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);
        const newData = request.body;

        const categoriaData: Categoria[] = await db
        .select()
        .from(categoria)
        .where(eq(categoria.id, id));

        const categoriaUpdate = await db
        .update(categoria)
        .set({
            ...categoriaData[0],
            ...newData
        })

        response.status(200).json(categoriaUpdate);
    } catch(error) {
        next(error);
    }
}

export async function deleteCategoriaController(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const deletedCategoria = await db
        .delete(categoria)
        .where(eq(categoria.id, id));

        return response.status(200).json(deletedCategoria);
    } catch (error){
        next(error);
    }
}
