import { NextFunction, Request, Response } from "express";
import { ReceiptIdSchemaValidator } from "../utils/validation";

export const validateReceiptIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        ReceiptIdSchemaValidator.parse({ id: req.params.id });
        next();
    } catch (error) {
        next(error);
    }
}