import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { cidadeTable, cidadeUpdateSchema } from "../schema";

export async function updateCidade(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const data = request.body;

    const getCidadeQuery = db
    .select()
    .from(cidadeTable)
    .where(
        eq(
            cidadeTable.id, sql.placeholder("id")
        )
    )
    .prepare();

    try {
        const isValid = cidadeUpdateSchema.safeParse(data);
        if (!isValid.success) return response.status(400).send(isValid.error.issues[0].message);

        const result = await db.transaction(async (transaction) => {
            const [cidade] = await getCidadeQuery.execute({ id });
            if(!cidade) {
                transaction.rollback();
            }
            const updatedCidade = await transaction
            .update(cidadeTable)
            .set({
                ...cidade,
                ...data
            })
            .where(
                eq(
                    cidadeTable.id, id
                )
            );
            return updatedCidade;
        });
        return response.status(200).json(result);
    } catch(error){
        return response.status(404).json(error);
    }
}
