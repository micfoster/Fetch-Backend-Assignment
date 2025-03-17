import { z } from 'zod';
import { Receipt } from '../models/receipt.model';

const ItemSchema = z.object({
    shortDescription: z.string().regex(/^[\w\s\-]+$/),
    price: z.string().regex(/^\d+\.\d{2}$/)
});

const receiptSchema = z.object({
    retailer: z.string().regex(/^[\w\s\-&]+$/),
    purchaseDate: z.string().date(),
    purchaseTime: z.string().regex(/^\d{2}:\d{2}$/),
    total: z.string().regex(/^\d+\.\d{2}$/),
    items: z.array(ItemSchema).min(1),
});

export const validateReceipt = (data: unknown): Receipt => {
    return receiptSchema.parse(data);
};

export const ReceiptSchemaValidator = receiptSchema;

export const ReceiptIdSchemaValidator = z.object({
    id: z.string().regex(/^\S+$/)
});