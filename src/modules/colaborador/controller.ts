import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { hashSenha } from "./helpers/encrypt";
import { colaborador } from "./schema";

export async function createColaborador(request: Request, response: Response, next: NextFunction) {
    try{
        const { body } = request;
        const hashedPassword =  await hashSenha(body.senha);

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
