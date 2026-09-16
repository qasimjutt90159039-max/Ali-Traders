import express from 'express';
import dotenv from 'dotenv';
import apiRouter from '../backend/routes/api';
import { connectDB } from '../backend/config/db';

dotenv.config();

const app = express();

// Connect to MongoDB if configured
connectDB().catch(err => {
  console.warn('[Database] Serverless DB connection warning:', err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle API requests with or without /api prefix depending on rewrite behavior
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
