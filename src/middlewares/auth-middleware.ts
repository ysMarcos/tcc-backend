import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../env";

interface TokenPayload {
    id: number,
    usuario: string,
    dataInicio: Date,
    dataPrevisaoFim: Date,
    ativo: boolean,
    pessoaId: number,
    iat: number,
    exp: number
}

export async function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;
    if(!authorization) return response.sendStatus(401);

    const token = authorization.replace('Bearer', '').trim();

    try{
        const data = jwt.verify(token, jwtSecret);
        const { id } = data as TokenPayload;

        request.userId = id;
        return next();
    } catch {
        return response.sendStatus(401);
    }
}
