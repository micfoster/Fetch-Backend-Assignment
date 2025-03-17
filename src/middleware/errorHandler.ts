import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(400).json({ message: 'The receipt is invalid' });
    } else {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};