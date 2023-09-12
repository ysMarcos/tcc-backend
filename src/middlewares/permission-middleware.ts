import { and, eq, inArray } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { colaborador } from "../modules/colaborador/schema";
import { permissao } from "../modules/permissao/schema";
import { permissaoColaborador } from "../modules/permissao-colaborador/schema";

export function verifyPermission(permission: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request;

        const userExists = await db
        .select({id: colaborador.id})
        .from(colaborador)
        .where(eq(colaborador.id, userId));

        if(!userExists) return response.sendStatus(400).json({ message: "User does not exits" });

        const permissaoExists = await db
        .select({id: permissao.id})
        .from(permissao)
        .where(inArray(permissao.nome, permission));

        if(!permissaoExists) return response.sendStatus(400).json({ message: "Permission does not exits" });

        const userPermission = await db
        .select()
        .from(permissaoColaborador)
        .innerJoin(
            permissao,
            eq(permissao.id, permissaoColaborador.permissaoId)
        )
        .where(
            and(
                eq(permissaoColaborador.colaboradorId, userId),
                inArray(permissao.nome, permission)
            )
        )
        if(!userPermission[0]) return response.sendStatus(401)

        return next();
    }

}
