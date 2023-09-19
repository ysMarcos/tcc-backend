import { NextFunction, Request, Response } from "express";
import { itemTable, itemInsertSchema } from "./schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export async function createItem(request: Request, response: Response, next: NextFunction) {
    try {
        const newItemData = request.body;

        const isValid = itemInsertSchema.safeParse(newItemData);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const newItem = await db
        .insert(itemTable)
        .values(newItemData);

        response.status(200).json(newItem);
    } catch(error){
        next(error);
    }
}

export async function getItemById(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const id = Number(params.id);

        const itemData = await db
        .select()
        .from(itemTable)
        .where(eq(itemTable.id, id))
        .limit(1);

        response.status(200).json(itemData);
    } catch(error){
        next(error);
    }
}

export async function listItem(request: Request, response: Response, next: NextFunction) {
    try {

        const itemData = await db
        .select()
        .from(itemTable)
        .orderBy(itemTable.nome);

        response.status(200).json(itemData);
    } catch(error){
        next(error);
    }
}

export async function updateItem(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const id = Number(params.id);
        const newItemData = request.body;

        const itemToUpdate = await db
        .select()
        .from(itemTable)
        .where(eq(itemTable.id, id));

        const updatedItem = await db
        .update(itemTable)
        .set({
            ...itemToUpdate[0],
            ...newItemData
        })
        .where(eq(itemTable.id, id));

        return response.status(200).json(updatedItem);
    } catch(error){
        next(error);
    }
}


export async function deleteItem(request: Request, response: Response, next: NextFunction) {
    try {
        const { params } = request;
        const id = Number(params.id);

        const deletedItem = await db
        .delete(itemTable)
        .where(eq(itemTable.id, id));

        return response.status(200).json(deletedItem);
    } catch(error){
        next(error);
    }
}
