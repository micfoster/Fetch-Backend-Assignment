import { Router } from "express";
import { getPointsById, processReceipt } from "../controllers/receipt.controller";
import { validateReceiptMiddleware } from "../middleware/validateReceipt";

const receiptRouter = Router();

receiptRouter.post('/process', validateReceiptMiddleware, processReceipt);
receiptRouter.get('/:id/points', getPointsById);

export default receiptRouter;