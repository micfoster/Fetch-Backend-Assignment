import { Router } from "express";
import { getPointsById, processReceipt } from "../controllers/receipt.controller";
import { validateReceiptMiddleware } from "../middleware/validateReceipt";
import { validateReceiptIdMiddleware } from "../middleware/validateReceiptId";

const receiptRouter = Router();

receiptRouter.post('/process', validateReceiptMiddleware, processReceipt);
receiptRouter.get('/:id/points', validateReceiptIdMiddleware, getPointsById);

export default receiptRouter;