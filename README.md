# Receipt Processor API – Interviewer Guide

Welcome! This guide is to reviewing the implementation of the Receipt Processor API take-home assignment.

---

## Overview
This project implements the Receipt Processor API as per the OpenAPI `api.yml` specification. The application is built using **Node.js + Express + TypeScript**, and features:
- Fully functional endpoints
- Strict schema validation using Zod
- Functional tests with Jest & Supertest
- Dockerized deployment

---

## Tech Stack
- Node.js 22
- TypeScript
- Express.js
- Zod (validation)
- Jest + Supertest (testing)
- Docker + Docker Compose

---

## Getting Started

### 1. **Clone the Repository**
```bash
git clone <repo-url>
cd receipt-processor-api
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Run the Application (Local)**
```bash
npm run start
```

### 4. **Run the Application (Docker)**
```bash
docker-compose up --build
```

---

## API Endpoints

### POST `/receipts/process`
- Accepts a receipt JSON object.
- Returns a unique receipt ID.

#### Example Request:
```json
{
  "retailer": "M&M Corner Market",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "total": "6.49",
  "items": [
    { "shortDescription": "Mountain Dew 12PK", "price": "6.49" }
  ]
}
```

#### Example Response:
```json
{
  "id": "adb6b560-0eef-42bc-9d16-df48f30e89b2"
}
```

### GET `/receipts/:id/points`
- Returns total points earned for a processed receipt.

#### Example Response:
```json
{
  "points": 105
}
```

---

## Points Calculation Rules Implemented
- 1 point for every alphanumeric character in retailer name.
- 50 points if total is a round dollar amount.
- 25 points if total is a multiple of 0.25.
- 5 points for every two items on the receipt.
- Bonus points if trimmed description length is a multiple of 3: `(price * 0.2)` rounded up.
- 6 points if purchase date's day is odd.
- 10 points if time is between 14:00 and 16:00.

---

## Testing the API
### Run the complete test suite:
```bash
npm run test
```
- Tests include success/failure cases for each endpoint.
- Edge cases for every points calculation rule.
- Tests validate not only API responses but also the backend scoring logic.

---

## Docker Testing (Alternative Setup)
```bash
docker-compose up --build
```

Use Postman/Insomnia to test endpoints at:
- `http://localhost:3000/receipts/process`
- `http://localhost:3000/receipts/{id}/points`

---

## Notes for Reviewers
- Code is modular and testable with clear separation of concerns.
- Points rules are encapsulated and test-covered.

Feel free to review test logs and edge case assertions for confidence in implementation coverage.

Thank you for reviewing!