import { inArray } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../db";
import { dataExistsParams } from "../../helpers/exists";
import { colaborador } from "../colaborador/schema";
import { permissao } from "../permissao/schema";
import { permissaoColaborador } from "./schema";

export async function addPermissaoToColaborador(request: Request, response: Response) {
    const userId = request.params.userId;
    const permissoes = request.body.permissoes;
    try {
        const userExists = await dataExistsParams(Number(userId), colaborador);
        if(!userExists) return response.status(400).json({ message: "User does not exists" });

        const permissoesId = await db
        .select({ id: permissao.id})
        .from(permissao)
        .where(inArray(permissao.nome, permissoes));

        permissoesId.forEach(async (value) => {
            await db
            .insert(permissaoColaborador)
            .values({
                colaboradorId: Number(userId),
                permissaoId: Number(value.id)
            })
        })
        return response.status(200).json({ message: "Success" })
    } catch(error){
        return response.status(500).json(error)
    }
}
