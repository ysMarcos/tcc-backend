import { Request, Response } from "express";
import { db } from "../../db";
import { InsertPessoa, pessoa } from "./model";

export async function createPessoaController (request: Request, response: Response) {
    try {
        console.log("a")
        const newPessoa: InsertPessoa = request.body;

        const createdPessoa = await db.insert(pessoa).values(newPessoa)

        return response.sendStatus(200).json({ createdPessoa })
    } catch(error) {
        response.sendStatus(500).json(error)
    }
}
