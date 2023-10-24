import { Request, Response } from "express";
import { db } from "../../../db";
import { colaboradorTable, colaboradorUpdateSchema } from "../schema";
import { eq, sql } from "drizzle-orm";
import { hashSenha } from "../helpers/encrypt";

export async function updateColaborador(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const {
        usuario,
        senha,
        ativo,
        dataPrevisaoFim
    } = request.body;

    let newPassword;
    if(senha){
        newPassword = await hashSenha(senha);
    }

    const newData = {
        usuario,
        newPassword,
        ativo,
        dataPrevisaoFim
    }

    const getColaboradorToUpdateQuery = db
        .select()
        .from(colaboradorTable)
        .where(
            eq(
                colaboradorTable.id, sql.placeholder("id")
            )
        )
        .prepare();

    try {
        const isValid = colaboradorUpdateSchema.safeParse({
            usuario: newData.usuario,
            senha: newData.newPassword,
            ativo: newData.ativo,
            dataPrevisaoFim: newData.dataPrevisaoFim
        });
        if(!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [colaborador] = await getColaboradorToUpdateQuery.execute({id});
            if(!colaborador) {
                transaction.rollback();
            }
            const result = await db
                .update(colaboradorTable)
                .set({
                    ...colaborador,
                    ...newData
                })
                .where(
                    eq(
                        colaboradorTable.id, id
                    )
                );

            if(!result){
                transaction.rollback();
            }
            return result;
        })

        response.status(200).json(result)
    } catch (error) {
        return response.status(400).json(error)
    }
}
