import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { eq } from 'drizzle-orm';
import { dataExists } from "../../helpers/exists";
import { clienteFornecedor, clienteFornecedorInsertSchema } from "./schema";

export async function createClienteFornecedor (request: Request, response: Response, next: NextFunction) {
    try {
        const newCliforData = request.body;

        const isValid = clienteFornecedorInsertSchema.safeParse(newCliforData);
        if(!isValid.success) return response.status(400).json(isValid.error.issues);

        const cadastroExists = await dataExists(newCliforData, clienteFornecedor, "cadastro");
        if(cadastroExists) return response.status(400).json({ message: "This cpf/cnpj already exists" });

        const emailExists = await dataExists(newCliforData, clienteFornecedor, "email");
        if(emailExists) return response.status(400).json({ message: "This email already exists" });

        const newClifor = await db
        .insert(clienteFornecedor)
        .values(newCliforData);

        response.status(200).json( newClifor )
    } catch(error) {
        next(error)
    }
}

export async function listClienteFornecedor (request: Request, response: Response, next: NextFunction) {
    try{
        const clienteFornecedores = await db
        .select()
        .from(clienteFornecedor);

        response.status(200).json(clienteFornecedores);
    } catch (error) {
        next(error);
    }
}

export async function getClienteFornecedorById (request: Request, response: Response, next: NextFunction) {
    try {
        const id  = Number(request.params.id);

        const selectClifor = await db
        .select()
        .from(clienteFornecedor)
        .where(eq(clienteFornecedor.id, id))
        .limit(1);

        response.status(200).json(selectClifor[0]);
    } catch (error) {
        next(error);
    }
}

export async function deleteClienteFornecedor(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const deletedClifor = await db
        .delete(clienteFornecedor)
        .where(eq(clienteFornecedor.id, id));

        return response.status(200).json(deletedClifor);
    } catch (error){
        next(error);
    }
}

export async function updateClienteFornecedor(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);
        const data = request.body;

        const cliforToUpdate = await db
            .select()
            .from(clienteFornecedor)
            .where(eq(clienteFornecedor.id, id))

        const updateClifor = await db
            .update(clienteFornecedor)
            .set({
                ...cliforToUpdate[0],
                ...data
            })
            .where(eq(clienteFornecedor.id, id));

        response.status(200).json(updateClifor);
    } catch (error) {
        next(error)
    }
}
