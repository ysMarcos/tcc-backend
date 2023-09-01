import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { pessoaInsertSchema, Pessoa, pessoa } from "./schema";
import { eq } from 'drizzle-orm';

export async function createPessoa (request: Request, response: Response, next: NextFunction) {
    try {
        const newPessoa = request.body

        const isValid = pessoaInsertSchema.safeParse(newPessoa);
        if(!isValid.success) return response.status(400).json(isValid.error.issues);

        const createdPessoa = await db
        .insert(pessoa)
        .values(newPessoa);

        response.status(200)
            .json( createdPessoa )
    } catch(error) {
        next(error)
    }
}

export async function listPessoa (request: Request, response: Response, next: NextFunction) {
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

export async function getPessoaById (request: Request, response: Response, next: NextFunction) {
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

export async function updatePessoa(request: Request, response: Response, next: NextFunction) {
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

export async function deletePessoa(request: Request, response: Response, next: NextFunction) {
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
