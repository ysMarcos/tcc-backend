import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../db";
import { colaborador } from "./schema"
import { jwtSecret } from "../../../env";

export async function auth(request: Request, response: Response) {
    const { usuario, senha } = request.body;
    const selectUser = await db
        .select()
        .from(colaborador)
        .where(eq(colaborador.usuario, usuario))
        .limit(1);
    const user = selectUser[0]
    if(!user) return response.status(401);

    const isValidPassword = await bcrypt.compare(senha, <string>user.senha);
    if(!isValidPassword) return response.status(401);

    const token = jwt.sign({
        id: user.id,
        usuario: user.usuario,
        dataInicio: user.dataInicio,
        dataPrevisaoFim: user.dataPrevisaoFim,
        ativo: user.ativo,
        pessoaId: user.pessoaId
    }, jwtSecret, { expiresIn: '1d' });

    return response.json(token)
}
