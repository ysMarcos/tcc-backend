import { and, eq, inArray, or } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { colaboradorTable } from "../modules/colaborador/schema";
import { permissaoTable } from "../modules/permissao/schema";
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
        .select({id: permissaoTable.id})
        .from(permissaoTable)
        .where(inArray(permissaoTable.nome, permission));

        if(!permissaoExists) return response.sendStatus(400).json({ message: "Permission does not exits" });

        const userPermission = await db
        .select()
        .from(permissaoColaborador)
        .innerJoin(
            permissaoTable,
            eq(permissaoTable.id, permissaoColaborador.permissaoId)
        )
        .where(
            and(
                eq(permissaoColaborador.colaboradorId, userId),
                or(
                    inArray(permissaoTable.nome, permission),
                    eq(permissaoTable.id, 1)
                )

            )
        )
        if(!userPermission[0]) return response.sendStatus(401)

        return next();
    }

}
