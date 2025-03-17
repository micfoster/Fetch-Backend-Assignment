import { v4 as uuidv4 } from 'uuid';
import { Receipt } from "../models/receipt.model";

class ReceiptService {
    private receipts = new Map<string, { receipt: Receipt; points: number }>();

    processReceipt(receipt: Receipt): { id: string } {
        const id = uuidv4();
        const points = this.calculatePoints(receipt);
        this.receipts.set(id, { receipt, points });
        return { id };
    }

    getPoints(id: string): number | null {
        const data = this.receipts.get(id);
        return data ? data.points : null;
    }

    private calculatePoints(receipt: Receipt): number {
        let points = 0;
        console.log('Breakdown:');
        // One point for every alphanumeric character in the retailer name.
        const alphanumericCharsLength = receipt.retailer.match(/[a-zA-Z0-9]/g)?.length;
        if (alphanumericCharsLength) {
            points += alphanumericCharsLength;
            console.log(`   ${alphanumericCharsLength} points - retailer name has ${alphanumericCharsLength} characters`);
        }
        // 50 points if the total is a round dollar amount with no cents.
        if (receipt.total.endsWith('00')) {
            points += 50;
            console.log(`   50 points - total amount(${receipt.total}) is a round dollar amount with no cents`);
        }
        // 25 points if the total is a multiple of 0.25.
        if (parseFloat(receipt.total) % 0.25 === 0) {
            points += 25;
            console.log(`   25 points - total amount(${receipt.total}) is a multiple of 0.25`);
        }
        // 5 points for every two items on the receipt.
        if (receipt.items.length >= 2) {
            points += Math.floor(receipt.items.length / 2) * 5;
            console.log(`   ${Math.floor(receipt.items.length / 2) * 5} points - ${receipt.items.length} items (${Math.floor(receipt.items.length / 2)} pairs @ 5 points each)`);
        }
        for (const item of receipt.items) {
            // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
            const descriptionLength = item.shortDescription.trim().length;
            if (descriptionLength % 3 === 0) {
                points += Math.ceil(parseFloat(item.price) * 0.2);
                console.log(`   ${Math.ceil(parseFloat(item.price) * 0.2)} points - "${item.shortDescription}" is ${descriptionLength} characters (a multiple of 3)
                item price of ${item.price} * 0.2 = ${parseFloat(item.price) * 0.2}, rounded up is ${Math.ceil(parseFloat(item.price) * 0.2)} points
                `);
            }
        }
        // 6 points if the day in the purchase date is odd.
        const purchaseDateTime = new Date(`${receipt.purchaseDate} ${receipt.purchaseTime}`);
        const dayOfMonth = purchaseDateTime.getDate();
        const isOddDay = dayOfMonth % 2 !== 0;
        if (isOddDay) {
            points += 6;
            console.log(`   6 points - purchase day is odd`);
        }
        // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
        const purchaseTime = purchaseDateTime.getHours();
        if (purchaseTime >= 14 && purchaseTime < 16) {
            points += 10;
            console.log(`   10 points - ${receipt.purchaseTime} is between 2:00pm and 4:00pm`);
        }

        console.log(` + -----`);
        console.log(` = ${points} points`);
        return points;
    }
}

export const receiptService = new ReceiptService();