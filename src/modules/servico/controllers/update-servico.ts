import { eq, sql } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "../../../db";
import { servicoTable } from "../schema";

export async function updateServico(request: Request, response: Response){
    const { params } = request;
    const id = Number(params.id);
    const data = request.body;

    const getServicoQuery = db
    .select()
    .from(servicoTable)
    .where(
        eq(
            servicoTable.id, sql.placeholder("id")
        )
    )
    .prepare();

    try {
        const result = await db.transaction(async (transaction) => {
            const [servico] = await getServicoQuery.execute({ id });
            if(!servico) {
                transaction.rollback();
            }
            const result = await transaction
            .update(servicoTable)
            .set({
                ...servico,
                ...data
            })
            .where(
                eq(
                    servicoTable.id, id
                )
            );
            return result;
        });
        return response.status(200).json(result);
    } catch(error){
        return response.status(404).json(error);
    }
}
