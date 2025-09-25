import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';
import resourceRoutes from './routes/resources.js';
import feedbackRoutes from './routes/feedback.js';
import moderationRoutes from './routes/moderation.js';
import questionRoutes from './routes/questions.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send('Placement Prep API. See /api/health');
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/moderation', moderationRoutes);
app.use('/api/questions', questionRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    let mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.log('MONGO_URI not set. Starting in-memory MongoDB (data will reset on restart).');
      const mem = await MongoMemoryServer.create();
      mongoUri = mem.getUri();
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');

    // Serve frontend build if present
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const publicDir = path.resolve(__dirname, '../public');
    app.use(express.static(publicDir));

    // SPA fallback for non-API routes
    app.get(/^(?!\/api\/).*/, (req, res) => {
      res.sendFile(path.join(publicDir, 'index.html'));
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


