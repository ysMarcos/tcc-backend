import { NextFunction, Request, Response } from "express";

export function serverError(request: Request, response: Response, error: Error, next: NextFunction) {
    const statusCode = response.statusCode !== 200 ? response.statusCode : 500;
    response.status(statusCode).json({
        message: error.message
    })
}
