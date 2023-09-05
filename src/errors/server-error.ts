import { Response } from "express";

export const serverError = (response: Response) => {
    return response.status(500).json({
        message : 'Internal Server Error'
    })
}
