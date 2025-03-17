import { Receipt } from "../models/receipt.model";

class ReceiptService {
    private receipts = new Map<string, { receipt: Receipt; points: number }>();

    processReceipt(receipt: Receipt): { id: string } {
        const id = Math.random().toString();

        return { id };
    }

    getPoints(id: string): number | null {
        const data = this.receipts.get(id);
        return data ? data.points : null;
    }

    private calculatePoints(receipt: Receipt): number {
        let points = 0;

        return points;
    }
}

export const receiptService = new ReceiptService();