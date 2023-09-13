import { NextFunction, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { hashSenha } from "./helpers/encrypt";
import { colaborador } from "./schema";

export async function createColaborador(request: Request, response: Response, next: NextFunction) {
    const { body } = request;
    const hashedPassword = await hashSenha(body.senha);

    try{
        const newColaborador = await db
            .insert(colaborador)
            .values({
                ...body,
                senha: hashedPassword
            })
        return response.status(200).json(newColaborador);
    } catch (error){
        next(error)
    }
}

export async function listColaborador (request: Request, response: Response, next: NextFunction) {
    try{
        const colaboradores = await db
        .select()
        .from(colaborador)
        .orderBy(colaborador.id);

        response.status(200).json(colaboradores);
    } catch (error) {
        next(error);
    }
}

export async function getColaboradorById (request: Request, response: Response, next: NextFunction) {
    try {
        const id  = Number(request.params.id);

        const selectColaborador = await db
        .select()
        .from(colaborador)
        .where(eq(colaborador.id, id))
        .limit(1);

        response.status(200).json(selectColaborador[0]);
    } catch (error) {
        next(error);
    }
}

export async function updateColaborador(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);
        const data = request.body;

        const colaboradorToUpdate = await db
            .select()
            .from(colaborador)
            .where(eq(colaborador.id, id))

        const updateColaborador = await db
            .update(colaborador)
            .set({
                ...colaboradorToUpdate[0],
                ...data
            })
            .where(eq(colaborador.id, id));

        response.status(200).json(updateColaborador);
    } catch (error) {
        next(error)
    }
}
