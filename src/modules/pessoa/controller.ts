import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { pessoaInsertSchema, Pessoa, pessoaTable } from "./schema";
import { eq } from 'drizzle-orm';
import { dataExists } from "../../helpers/exists";

export async function createPessoa (request: Request, response: Response, next: NextFunction) {
    try {
        const newPessoaData = request.body;

        const isValid = pessoaInsertSchema.safeParse(newPessoaData);
        if(!isValid.success) return response.status(400).json(isValid.error.issues);

        const cadastroExists = await dataExists(newPessoaData, pessoaTable, "cadastro");
        if(cadastroExists) return response.status(400).json({ message: "This cpf/cnpj already exists" });

        const emailExists = await dataExists(newPessoaData, pessoaTable, "email");
        if(emailExists) return response.status(400).json({ message: "This email already exists" });

        const newPessoa = await db
        .insert(pessoaTable)
        .values(newPessoaData);

        response.status(200).json( newPessoa )
    } catch(error) {
        next(error)
    }
}

export async function listPessoa (request: Request, response: Response, next: NextFunction) {
    try{
        const pessoas: Pessoa[] = await db
        .select()
        .from(pessoaTable)
        .orderBy(pessoaTable.nome);

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
        .from(pessoaTable)
        .where(eq(pessoaTable.id, id))
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

        const fields = ["nome", "telefone", "email", "cadastro", "registro"];
        let validateData;
        for(let i = 0; i < fields.length; i++){
            validateData = await dataExists(data, pessoaTable, fields[i]);
            if(validateData) return response.status(400)
                .json({
                    message: `There is another person with this ${fields[i]} already exists`
                });
        }

        const pessoaToUpdate = await db
            .select()
            .from(pessoaTable)
            .where(eq(pessoaTable.id, id))

        const updatePessoa = await db
            .update(pessoaTable)
            .set({
                ...pessoaToUpdate[0],
                ...data
            })
            .where(eq(pessoaTable.id, id));

        response.status(200).json(updatePessoa)
    } catch (error) {
        next(error)
    }
}

export async function deletePessoa(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const deletedPessoa = await db
        .delete(pessoaTable)
        .where(eq(pessoaTable.id, id));

        return response.status(200).json(deletedPessoa);
    } catch (error){
        next(error);
    }
}
