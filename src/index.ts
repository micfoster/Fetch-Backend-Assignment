import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.route';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});