import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/db.js';
import AuthRoutes from './src/routes/AuthRoutes.js';
import TaskRoutes from './src/routes/TaskRoutes.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/auth', AuthRoutes);
app.use('/api/task', TaskRoutes);

connectDB();

app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
