import { Router } from "express";
import receiptRouter from "./receipts.route";

const router = Router();

router.use('/receipts', receiptRouter);

export default router;