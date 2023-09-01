import { NextFunction, Request, Response } from "express";
import { item, itemInsertSchema } from "./schema";
import { db } from "../../db";

export async function createItemController(request: Request, response: Response, next: NextFunction) {
    try {
        const newItemData = request.body;

        const isValid = itemInsertSchema.safeParse(newItemData);
        if (!isValid.success) return response.status(400).send({
            path: isValid.error.issues[0].path[0],
            message: isValid.error.issues[0].message
        });

        const newItem = await db
        .insert(item)
        .values(newItemData);

        response.status(200).json(newItem);
    } catch(error){
        next(error);
    }
}

// export async function listItemController(request: Request, response: Response, next: NextFunction) {
//     try {
//         const { params } = request;
//         const id = Number(params.id);

//         co

//     } catch(error){
//         next(error);
//     }
// }
