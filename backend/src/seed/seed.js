import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Resource from '../models/Resource.js';
import Feedback from '../models/Feedback.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placement_prep';

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to Mongo');

  await Promise.all([User.deleteMany({}), Resource.deleteMany({}), Feedback.deleteMany({})]);

  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const userPassword = await bcrypt.hash('User@123', 10);

  const [admin, user] = await User.create([
    { name: 'Admin', email: 'admin@example.com', passwordHash: adminPassword, role: 'admin' },
    { name: 'Student', email: 'student@example.com', passwordHash: userPassword, role: 'user' }
  ]);

  const resources = await Resource.create([
    {
      title: 'Top 50 Aptitude Questions',
      category: 'Aptitude',
      tags: ['quant', 'practice'],
      content: 'A curated list of aptitude questions with solutions to prepare for placements.',
      link: 'https://example.com/aptitude'
    },
    {
      title: 'DSA Coding Problems Set',
      category: 'Coding',
      tags: ['arrays', 'graphs', 'dp'],
      content: 'Hand-picked coding problems grouped by topic and difficulty with hints.',
      link: 'https://example.com/dsa'
    },
    {
      title: 'Interview Tips and Etiquette',
      category: 'Interview',
      tags: ['hr', 'behavioral'],
      content: 'Do\'s and Don\'ts, common HR questions with sample answers.',
      link: 'https://example.com/interview-tips'
    },
    {
      title: 'Company Guide: GLA Placements Overview',
      category: 'Company Guide',
      tags: ['company', 'guide'],
      content: 'Recruitment process, rounds, and preparation strategy for popular companies.',
      link: 'https://example.com/company-guide'
    }
  ]);

  await Feedback.create([
    { userName: user.name, content: 'This portal really helped me crack my interview!', status: 'approved' },
    { userName: 'Aman', content: 'Please add more system design content.', status: 'pending' }
  ]);

  console.log('Seed complete');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


