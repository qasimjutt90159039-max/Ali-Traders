import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import apiRouter from './backend/routes/api';
import { connectDB } from './backend/config/db';

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  // Connect to DB if configured
  await connectDB();

  // Standard middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging in dev
  app.use((req, res, next) => {
    if (req.url.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.url}`);
    }
    next();
  });

  // Mount API router FIRST before Vite
  app.use('/api', apiRouter);

  // Vite middleware or production static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ali Jan Traders & Interiors server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal server startup error:', err);
});
