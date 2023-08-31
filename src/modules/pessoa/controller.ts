import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { InsertPessoa, Pessoa, pessoa } from "./schema";
import { eq } from 'drizzle-orm';

export async function createPessoaController (request: Request, response: Response, next: NextFunction) {
    try {
        const newPessoa: InsertPessoa = request.body;

        const createdPessoa = await db
        .insert(pessoa)
        .values(newPessoa);

        response.status(200)
            .json( createdPessoa )
    } catch(error) {
        next(error)
    }
}

export async function listPessoaController (request: Request, response: Response, next: NextFunction) {
    try{
        const pessoas: Pessoa[] = await db
        .select()
        .from(pessoa)
        .orderBy(pessoa.nome);

        response.status(200).json(pessoas);
    } catch (error) {
        next(error);
    }
}

export async function getPessoaByIdController (request: Request, response: Response, next: NextFunction) {
    try {
        const id  = Number(request.params.id);

        const selectPessoa: Pessoa[] = await db
        .select()
        .from(pessoa)
        .where(eq(pessoa.id, id))
        .limit(1);

        response.status(200).json(selectPessoa[0]);
    } catch (error) {
        next(error);
    }
}

export async function updatePessoaController(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);
        const data = request.body;

        const pessoaToUpdate = await db
        .select()
        .from(pessoa)
        .where(eq(pessoa.id, id))
        .limit(1);

        const updatePessoa = await db
        .update(pessoa)
        .set({
            ...pessoaToUpdate[0],
            ...data
        })
        .where(eq(pessoa.id, id));

        response.status(200).json(updatePessoa)
    } catch (error) {
        next(error)
    }
}

export async function deletePessoaController(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const deletedPessoa = await db
        .delete(pessoa)
        .where(eq(pessoa.id, id));

        return response.status(200).json(deletedPessoa);
    } catch (error){
        next(error);
    }
}
