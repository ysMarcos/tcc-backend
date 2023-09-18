import { Request, Response } from "express"
import { db } from "../../db";
import { venda } from "./schema";

export async function createVenda(request: Request, response: Response){
    const vendaData = request.body;
    try {
        const insertVenda = await db
        .insert(venda)
        .values(vendaData);

        return response.status(200).json(insertVenda)
    } catch(error){
        return response.status(500).json(error);
    }
}
