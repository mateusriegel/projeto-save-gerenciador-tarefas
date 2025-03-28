import express from 'express' 
import authRoutes from './src/routes/auth-routes.js' 
import connectDB from './src/config/db.js'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', authRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is alive!"));