import { Request, Response } from "express";
import  { sql } from "drizzle-orm"
import { db } from "../../../db";
import { permissaoTable, permissaoInsertSchema } from "../schema";

export async function createPermissao(request: Request, response: Response){
    const newPermissao = request.body;

    const sqlQuery = db
        .insert(permissaoTable)
        .values({
            nome: sql.placeholder("nome")
        })
        .prepare();

    try {
        const isValid = permissaoInsertSchema.safeParse(newPermissao);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const permissao = await sqlQuery.execute({
                nome: newPermissao.nome
            });
            if(!permissao) transaction.rollback();
            return permissao;
        })

        response.status(200)
            .json(result);
    } catch(error){
        return response.status(500).json(error);
    }
}
