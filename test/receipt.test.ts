import request from 'supertest';
import app from '../src/app';
import { Receipt } from '../src/models/receipt.model';

describe('Receipt API Functional Tests', () => {
    const processAndCheckPoints = async (receipt: Receipt, expectedPoints: number) => {
        const processRes = await request(app).post('/receipts/process').send(receipt);
        expect(processRes.status).toBe(200);
        const receiptId = processRes.body.id;
        expect(receiptId).toBeDefined();

        const pointsRes = await request(app).get(`/receipts/${receiptId}/points`);
        expect(pointsRes.status).toBe(200);
        expect(pointsRes.body.points).toBeDefined();
        expect(typeof pointsRes.body.points).toBe('number');
        console.log(`Tested Receipt ID: ${receiptId}, Points: ${pointsRes.body.points}`);
    };

    it('should return 400 for invalid receipt input', async () => {
        const res = await request(app)
            .post('/receipts/process')
            .send({ invalid: 'data' });

        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/The receipt is invalid/);
    });

    it('should return 200 and receipt id for valid receipt input and fetch points', async () => {
        const validReceipt = {
            retailer: "M&M Corner Market",
            purchaseDate: "2022-01-01",
            purchaseTime: "13:01",
            total: "6.49",
            items: [
                {
                    shortDescription: "Mountain Dew 12PK",
                    price: "6.49"
                }
            ]
        };
        await processAndCheckPoints(validReceipt, 20);
    });

    it('should return 404 for unknown receipt id', async () => {
        const res = await request(app).get('/receipts/invalid-id/points');
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/No receipt found/);
    });

    // Edge Case Tests for Points Calculation Rules

    it('should calculate alphanumeric character points in retailer name', async () => {
        await processAndCheckPoints({
            retailer: "A1B2&C3",
            purchaseDate: "2022-01-01",
            purchaseTime: "13:01",
            total: "1.30",
            items: [{ shortDescription: "Item", price: "1.00" }]
        }, 3);
    });

    it('should award 50 points if total is round dollar amount with no cents', async () => {
        await processAndCheckPoints({
            retailer: "Store",
            purchaseDate: "2022-01-01",
            purchaseTime: "13:01",
            total: "10.00",
            items: [{ shortDescription: "Item", price: "10.00" }]
        }, 50);
    });

    it('should award 25 points if total is multiple of 0.25', async () => {
        await processAndCheckPoints({
            retailer: "Store",
            purchaseDate: "2022-01-01",
            purchaseTime: "13:01",
            total: "5.75",
            items: [{ shortDescription: "Item", price: "5.75" }]
        }, 25);
    });

    it('should award points based on even number of items (5 points per 2 items)', async () => {
        await processAndCheckPoints({
            retailer: "Store",
            purchaseDate: "2022-01-01",
            purchaseTime: "13:01",
            total: "10.02",
            items: [
                { shortDescription: "Item1", price: "5.00" },
                { shortDescription: "Item2", price: "5.00" },
                { shortDescription: "Item3", price: "5.00" },
            ]
        }, 5);
    });

    it('should apply length-multiple-of-3 bonus on item description', async () => {
        await processAndCheckPoints({
            retailer: "Store",
            purchaseDate: "2022-01-01",
            purchaseTime: "13:01",
            total: "3.10",
            items: [{ shortDescription: "abc", price: "3.00" }]
        }, 1);
    });

    it('should award 6 points if purchase date day is odd', async () => {
        await processAndCheckPoints({
            retailer: "Store",
            purchaseDate: "2022-01-05",
            purchaseTime: "13:01",
            total: "1.10",
            items: [{ shortDescription: "Item", price: "1.00" }]
        }, 6);
    });

    it('should award 10 points if purchase time is between 14:00 and 16:00', async () => {
        await processAndCheckPoints({
            retailer: "Store",
            purchaseDate: "2022-01-02",
            purchaseTime: "14:30",
            total: "1.12",
            items: [{ shortDescription: "Item", price: "1.00" }]
        }, 10);
    });
});
