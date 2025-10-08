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
import mlRoutes from './routes/ml.js';
import { initializeMLModels } from './services/ml/modelTrainer.js';
import Resource from './models/Resource.js';
import Feedback from './models/Feedback.js';
import Question from './models/Question.js';

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
app.use('/api/ml', mlRoutes);

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

    // Initialize ML models
    await initializeMLModels();

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

    // Auto-seed minimal sample data if collections are empty
    try {
      const [resCount, qCount, fbCount] = await Promise.all([
        Resource.estimatedDocumentCount(),
        Question.estimatedDocumentCount(),
        Feedback.estimatedDocumentCount()
      ]);
      if (resCount === 0) {
        await Resource.create([
          { title: 'Top 50 Aptitude Questions', category: 'Aptitude', tags: ['quant','practice'], content: 'Hand-picked aptitude questions with solutions.', link: 'https://example.com/aptitude' },
          { title: 'DSA Sheet (Topic-wise)', category: 'Coding', tags: ['arrays','dp','graphs'], content: 'Practice DSA by topics with explanations.', link: 'https://example.com/dsa' },
          { title: 'Interview Etiquette & Tips', category: 'Interview', tags: ['hr','behavioral'], content: 'Crucial tips and common HR questions with sample answers.', link: 'https://example.com/interview' }
        ]);
      }
      if (qCount === 0) {
        const { mcqDataset } = await import('./seed/mcq-dataset.js');
        await Question.create([
          { kind: 'coding', title: 'Two Sum', source: 'LeetCode', difficulty: 'Easy', tags: ['array','hashmap'], description: 'Find indices of two numbers adding to target.', link: 'https://leetcode.com/problems/two-sum/', status: 'approved' },
          { kind: 'coding', title: 'Detect Loop in Linked List', source: 'GFG', difficulty: 'Easy', tags: ['linked-list'], description: 'Detect if a cycle exists in a linked list.', link: 'https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/', status: 'approved' },
          ...mcqDataset
        ]);
      }
      if (fbCount === 0) {
        await Feedback.create({ userName: 'Student', content: 'This site looks great and the content is helpful!', status: 'approved' });
      }
    } catch (seedErr) {
      console.warn('Seeding skipped/failed:', seedErr.message);
    }
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();


