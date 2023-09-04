import { NextFunction, Request, Response } from "express";
import { Endereco, endereco, enderecoInsertSchema } from "./schema";
import { db } from "../../db";
import { eq } from "drizzle-orm";

export async function createEndereco(request: Request, response: Response, next: NextFunction) {
    try {
        const newEndereco = request.body;
        const isValid = enderecoInsertSchema.safeParse(newEndereco);

        if(!isValid.success) return response.status(400).json(isValid.error.issues[0].message);

        const createdEndereco = await db
        .insert(endereco)
        .values(newEndereco);

        response.status(200).json(createdEndereco);
    } catch (error) {
        next(error);
    }
};

export async function listEnderecos(request: Request, response: Response, next: NextFunction) {
    try {
        const enderecos: Endereco[] = await db
        .select()
        .from(endereco)
        .orderBy(
                endereco.rua,
                endereco.numero,
                endereco.bairro
            );

        response.status(200).json(enderecos);
    } catch (error) {
        next(error);
    }
}

export async function getEnderecoById(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const selectEndereco: Endereco[] = await db
        .select()
        .from(endereco)
        .where(eq(endereco.id, id))
        .limit(1);

        response.status(200).json(selectEndereco[0]);
    } catch (error) {
        next(error);
    }
}

export async function updateEndereco(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);
        const data = request.body;

        const enderecoToUpdate: Endereco[] = await db
        .select()
        .from(endereco)
        .where(eq(endereco.id, id))
        .limit(1);

        const updateEndereco = await db
        .update(endereco)
        .set({
            ...enderecoToUpdate[0],
            ...data
        })
        .where(eq(endereco.id, id));

        response.status(200).json(updateEndereco);
    } catch (error) {
        next(error);
    }
}

export async function deleteEndereco(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const deleteEndereco = await db
        .delete(endereco)
        .where(eq(endereco.id, id));

        response.status(200).json(deleteEndereco);
    } catch (error) {
        next(error);
    }
}
