import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../../../env";

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

export async function refreshToken(request: Request, response: Response){
    const { refreshToken } = request.body;
    if(!refreshToken) {
        return response.status(401).send('Access Denied');
    }

    try {
        const data = jwt.verify(refreshToken, jwtSecret);

        const {
            id,
            usuario,
            dataInicio,
            dataPrevisaoFim,
            ativo,
            pessoaId
        } = data as TokenPayload

        const accessToken = jwt.sign({
            id: id,
            usuario: usuario,
            dataInicio: dataInicio,
            dataPrevisaoFim: dataPrevisaoFim,
            ativo: ativo,
            pessoaId: pessoaId
        }, jwtSecret, { expiresIn: '1h' })
        response
            .json({ accessToken })
    } catch(error){
        return response.status(400).send('Invalid refresh token');
    }
}
