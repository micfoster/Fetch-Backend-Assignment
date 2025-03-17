import { NextFunction, Request, Response } from "express";
import { ReceiptSchemaValidator } from "../utils/validation";

export const validateReceiptMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validated = ReceiptSchemaValidator.parse(req.body);
        req.body = validated;
        next();
    } catch (error) {
        next(error);
    }
};