import express from 'express';
import router from './routes/index.route';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());
app.use('/', router);
app.use(errorHandler);

export default app;