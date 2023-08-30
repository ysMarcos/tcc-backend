import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { Cidade, cidade, InsertCidade } from "./schema";

export async function createCidadeController(request: Request, response: Response, next: NextFunction) {
    try {
        const newCidade : InsertCidade = request.body;

        const createdCidade = await db.insert(cidade).values(newCidade);

        response.status(200).json(createdCidade);
    } catch (error) {
        next(error)
    }
}

export async function listCidadeController(request: Request, response: Response, next: NextFunction) {
    try {
        const cidades: Cidade[] = await db.select().from(cidade).orderBy(cidade.nome);
        response.status(200).json(cidades);
    } catch (error) {
        next(error)
    }
}

export async function getCiadeByIdController(request: Request, response: Response, next: NextFunction) {
    try {
        const id = Number(request.params.id);

        const getCidade: Cidade[] = await db.select().from(cidade).where(eq(cidade.id, id));

        response.status(200).json(getCidade);
    } catch (error) {
        next(error)
    }
}
