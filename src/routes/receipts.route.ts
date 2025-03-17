import { Router } from "express";

const receiptRouter = Router();


receiptRouter.post('/process');
receiptRouter.get('/:id/points');

export default receiptRouter;