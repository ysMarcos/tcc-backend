import { and, eq, inArray, like, or } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { colaboradorTable } from "../modules/colaborador/schema";
import { permissao } from "../modules/permissao/schema";
import { permissaoColaborador } from "../modules/permissao-colaborador/schema";

export function verifyPermission(permission: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request;

        const userExists = await db
        .select({id: colaboradorTable.id})
        .from(colaboradorTable)
        .where(eq(colaboradorTable.id, userId));

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
                or(
                    inArray(permissao.nome, permission),
                    like(permissao.nome, "admin")
                )

            )
        )
        if(!userPermission[0]) return response.sendStatus(401)

        return next();
    }

}
