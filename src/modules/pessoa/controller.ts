import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { InsertPessoa, pessoa } from "./model";

export async function createPessoaController (request: Request, response: Response, next: NextFunction) {
    try {

        const newPessoa: InsertPessoa = request.body;

        const createdPessoa = await db.insert(pessoa).values(newPessoa)
        console.log(createdPessoa)

        response.status(200)
            .json( createdPessoa )
    } catch(error) {
        next(error)
    }
}
