import { eq, inArray } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { colaborador } from "../modules/colaborador/schema";
import { permissao } from "../modules/permissao/schema";


export function verifyPermission(permission: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request;

        const userExists = await db
        .select({id: colaborador.id})
        .from(colaborador)
        .where(eq(colaborador.id, userId));

        if(!userExists) return response.status(401).json({ message: "User does not exits" });

        const permissaoExists = await db
        .select({id: permissao.id})
        .from(permissao)
        .where(inArray(permissao.nome, permission))
        if(!permissaoExists) return response.status(401).json({ message: "User does not exits" });

        return next();
    }

}
