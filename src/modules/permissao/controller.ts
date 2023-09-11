import { Request, Response } from "express";
import { db } from "../../db";
import { permissao, permissaoInsertSchema } from "./schema";

export async function createPermissao(request: Request, response: Response) {
    const newPermissaoData = request.body;
    const isValid = permissaoInsertSchema.safeParse(newPermissaoData);
    if(!isValid.success) return response.status(400).json(isValid.error.issues);

    try {
        const newPermissao = await db
        .insert(permissao)
        .values(newPermissaoData);

        return response.status(200).json(newPermissao);
    } catch(error){
        return response.status(500).json(error);
    }
}
