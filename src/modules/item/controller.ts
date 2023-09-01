import { NextFunction, Request, Response } from "express";
import { item, itemInsertSchema } from "./schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export async function createItem(request: Request, response: Response, next: NextFunction) {
    try {
        const newItemData = request.body;

        const isValid = itemInsertSchema.safeParse(newItemData);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const newItem = await db
        .insert(item)
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
        .from(item)
        .where(eq(item.id, id));

        response.status(200).json(itemData);
    } catch(error){
        next(error);
    }
}
