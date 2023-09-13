import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
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

export async function listPermissoes (request: Request, response: Response, next: NextFunction) {
    try{
        const permissoes = await db
        .select()
        .from(permissao)
        .orderBy(permissao.nome);

        response.status(200).json(permissoes);
    } catch (error) {
        next(error);
    }
}

export async function getpermissoesById (request: Request, response: Response, next: NextFunction) {
    try {
        const id  = Number(request.params.id);

        const selectPermissoes = await db
        .select()
        .from(permissao)
        .where(eq(permissao.id, id))
        .limit(1);

        response.status(200).json(selectPermissoes[0]);
    } catch (error) {
        next(error);
    }
}
