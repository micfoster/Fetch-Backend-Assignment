FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build || true

EXPOSE 3000

CMD ["node", "dist/server.js"]