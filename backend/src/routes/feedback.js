import { Router } from 'express';
import Feedback from '../models/Feedback.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Public: get only approved feedback
router.get('/', async (req, res) => {
  try {
    const items = await Feedback.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(100);
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch feedback', error: e.message });
  }
});

// Submit feedback (requires user)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { content, userName } = req.body;
    if (!content) return res.status(400).json({ message: 'Content is required' });
    const created = await Feedback.create({ content, userName: userName || req.user.name, status: 'pending' });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: 'Failed to submit feedback', error: e.message });
  }
});

export default router;


