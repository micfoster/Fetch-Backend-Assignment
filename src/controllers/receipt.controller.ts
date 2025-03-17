import { RequestHandler } from "express";
import { Receipt } from "../models/receipt.model";
import { receiptService } from "../services/receipt.service";

export const processReceipt: RequestHandler = async (req, res, next): Promise<void> => {
    try {
        const receipt = req.body as Receipt;
        const result = receiptService.processReceipt(receipt);
        res.status(200).json({ id: result.id });
    } catch (err) {
        next(err);
    }
};

export const getPointsById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const points = receiptService.getPoints(id);

        if (points === null) {
            res.status(404).json({ message: 'No receipt found for that ID.' });
        } else {
            res.status(200).json({ points });
        }
    } catch (err) {
        next(err);
    }
};