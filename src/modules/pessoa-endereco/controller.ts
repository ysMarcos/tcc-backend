import { and, eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { pessoaEndereco } from "./schema";

export async function addEnderecoToPessoaController(request: Request, response: Response, next: NextFunction) {
    try {
        const pessoaId = Number(request.params.pessoaId);
        const enderecoId = Number(request.params.enderecoId);

        const addEnderecoPessoa = await db.insert(pessoaEndereco).values({
            pessoaId,
            enderecoId
        });
        response.status(200).json(addEnderecoPessoa);
    } catch (error) {
        next(error)
    }
}

export async function removePessoaFromEnderecoController(request: Request, response: Response, next: NextFunction) {
    try {
        const pessoaId = Number(request.params.pessoaId);
        const enderecoId = Number(request.params.enderecoId);

        const addEnderecoPessoa = await db.delete(pessoaEndereco).where(and(
            eq(pessoaEndereco.pessoaId, pessoaId),
            eq(pessoaEndereco.enderecoId, enderecoId)))
        response.status(200).json(addEnderecoPessoa);
    } catch (error) {
        next(error)
    }
}
