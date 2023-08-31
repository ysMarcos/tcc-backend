import { and, eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { endereco } from "../endereco/schema";
import { pessoa } from "../pessoa/schema";
import { pessoaEndereco } from "./schema";

export async function addEnderecoToPessoaController(request: Request, response: Response, next: NextFunction) {
    try {
        const pessoaId = Number(request.params.pessoaId);
        const enderecoId = Number(request.params.enderecoId);

        const addEnderecoPessoa = await db
        .insert(pessoaEndereco)
        .values({
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

        const addEnderecoPessoa = await db
        .delete(pessoaEndereco)
        .where(
            and(
                eq(pessoaEndereco.pessoaId, pessoaId),
                eq(pessoaEndereco.enderecoId, enderecoId)
            )
        )
        response.status(200).json(addEnderecoPessoa);
    } catch (error) {
        next(error)
    }
}

export async function getPessoaEnderecoController(request: Request, response: Response, next: NextFunction) {
    try {
        const pessoaId = Number(request.params.pessoaId);

        const resultPessoaEndereco = await db
        .select({
            rua: endereco.rua,
            numero: endereco.numero,
            bairro: endereco.bairro,
            tipo: endereco.tipo
        })
        .from(pessoaEndereco)
        .innerJoin(pessoa, eq(pessoaEndereco.pessoaId, pessoa.id))
        .innerJoin(endereco, eq(pessoaEndereco.enderecoId, endereco.id))
        .where(eq(pessoa.id, pessoaId));

        response.status(200).json(resultPessoaEndereco);
    } catch (error) {
        next(error);
    }
}
