import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function ensureAuthenticated (request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;
    if(!authorization) return response.status(401);

    const token = authorization.replace('Bearer', '').trim();

    try{
        const data = jwt.verify(token, "segredo");
        console.log(data)
        next();
    } catch {
        return response.status(401);
    }
}
