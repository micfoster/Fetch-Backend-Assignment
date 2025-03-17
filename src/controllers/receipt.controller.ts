import { NextFunction, Request, Response } from "express";

export const processReceipt = (request: Request, response: Response, next: NextFunction) => {
    try {
        return response.status(200).json({ message: "process Receipt" });
    } catch (error) {
        next(error);
    }
};

export const getPointsById = (request: Request, response: Response, next: NextFunction) => {
    try {
        return response.status(200).json({ message: "get Points By Id" });
    } catch (error) {
        next(error);
    }
}