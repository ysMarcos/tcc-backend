import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../env";

export async function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;
    if(!authorization) return response.sendStatus(401);

    const token = authorization.replace('Bearer', '').trim();

    try{
        const data = jwt.verify(token, jwtSecret);
        next();
    } catch {
        return response.sendStatus(401);
    }
}
