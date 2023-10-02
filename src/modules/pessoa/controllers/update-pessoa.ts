import { Request, Response } from "express";
import { db } from "../../../db";
import { pessoaTable, pessoaUpdateSchema } from "../schema";
import { eq, sql } from "drizzle-orm";

export async function updatePessoa(request: Request, response: Response) {
    const { params } = request;
    const id = Number(params.id);
    const newData = request.body;

    const getPessoaToUpdateQuery = db
        .select()
        .from(pessoaTable)
        .where(
            eq(
                pessoaTable.id, sql.placeholder("id")
            )
        )
        .prepare();

    try {
        const isValid = pessoaUpdateSchema.safeParse(newData);
        if(!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [pessoa] = await getPessoaToUpdateQuery.execute({id});
            if(!pessoa) {
                transaction.rollback();
            }
            const updatedPessoa = await db
                .update(pessoaTable)
                .set({
                    ...pessoa,
                    ...newData
                })
                .where(
                    eq(
                        pessoaTable.id, id
                    )
                );
            return updatedPessoa
        })

        response.status(200).json(result)
    } catch (error) {
        return response.status(400).json(error)
    }
}
