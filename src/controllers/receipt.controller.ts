import { NextFunction, Request, Response, RequestHandler } from "express";

export const processReceipt: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        res.status(200).json({ message: "process Receipt" });
    } catch (err) {
        next(err);
    }
};

export const getPointsById: RequestHandler = async (request, response, next) => {
    try {
        response.status(200).json({ message: "get Points By Id" });
    } catch (error) {
        next(error);
    }
};