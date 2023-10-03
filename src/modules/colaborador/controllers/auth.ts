import { Request, Response } from "express";
import { eq, sql } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../../db";
import { colaboradorTable } from "../schema"
import { jwtSecret } from "../../../../env";

export async function auth(request: Request, response: Response) {
    const { usuario, senha } = request.body;
    const selectUserSql = db
        .select()
        .from(colaboradorTable)
        .where(
            eq(
                colaboradorTable.usuario, sql.placeholder("usuario")
            )
        )
        .prepare();

    try {
        const [user] = await selectUserSql.execute({ usuario })
        if (!user) return response.status(401).json({ message: "Invalid User or Password" });

        const isValidPassword = await bcrypt.compare(senha, <string>user.senha);
        if (!isValidPassword) return response.status(401).json({ message: "Invalid User or Password" });

        const accessToken = jwt.sign({
            id: user.id,
            usuario: user.usuario,
            dataInicio: user.dataInicio,
            dataPrevisaoFim: user.dataPrevisaoFim,
            ativo: user.ativo,
            pessoaId: user.pessoaId
        }, jwtSecret, { expiresIn: '1h' });

        const refreshToken = jwt.sign({
            id: user.id,
            usuario: user.usuario,
            dataInicio: user.dataInicio,
            dataPrevisaoFim: user.dataPrevisaoFim,
            ativo: user.ativo,
            pessoaId: user.pessoaId
        }, jwtSecret, { expiresIn: '1d' });

        return response.status(200)
            .json({ accessToken, refreshToken })
    }catch(error) {
        return response.status(401).json(error)
    }
}
