import { Router } from "express";
import { getPointsById, processReceipt } from "../controllers/receipt.controller";

const receiptRouter = Router();

receiptRouter.post('/process', processReceipt);
receiptRouter.get('/:id/points', getPointsById);

export default receiptRouter;