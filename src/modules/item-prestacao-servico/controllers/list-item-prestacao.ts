import { Request, Response } from "express";
import { db } from "../../../db";
import { eq, sql } from "drizzle-orm";
import { itemPrestacaoServicoTable } from "../schema";
import { itemTable } from "../../item/schema";

export async function listItemServico(request: Request, response: Response){
    const id = Number(request.params.id);

    const sqlQuery = db
        .select({
            id: itemPrestacaoServicoTable.id,
            nome: itemTable.nome,
            quantidade: itemPrestacaoServicoTable.quantidade,
            retornado: itemPrestacaoServicoTable.retornado
        })
        .from(itemPrestacaoServicoTable)
        .innerJoin(
            itemTable,
            eq( itemTable.id, itemPrestacaoServicoTable.itemId)
        )
        .where(
            eq(
                itemPrestacaoServicoTable.psId, sql.placeholder("id")
            )
        )
        .prepare();
    try {
        const result = await sqlQuery.execute({ id });
        return response.status(200).json(result);
    } catch(error){
        return response.status(400).json(error);
    }
}