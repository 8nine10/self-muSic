import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import songRoutes from './routes/songs.js';

dotenv.config();

const app = express();

app.use(express.json({ extended: true, limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

app.use('/user', userRoutes);
app.use('/songs', songRoutes);

(async () => {
    const dbUrl = process.env.MONGODB_URL

    if (!dbUrl) {
        console.error('MONGODB_URL environment variable is not set');
        process.exit(1);
    }

    const connectionString = `${dbUrl}/music`;

    try {
        await mongoose.connect(connectionString);
        console.log('MongoDB connected');

        const port = process.env.PORT || 2000;
        app.listen(port, () => {
            console.log(`Server live on port: ${port}`);
        });
    } catch (error) {
        console.error('MONGODB connection error: ', error);
        process.exit(1);
    }
})();
