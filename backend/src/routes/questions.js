import { Router } from 'express';
import Question from '../models/Question.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// Public list (approved only)
router.get('/', async (req, res) => {
  try {
    const { kind, q, tag, difficulty, page = 1, limit = 20 } = req.query;
    const query = { status: 'approved' };
    if (kind) query.kind = kind;
    if (difficulty) query.difficulty = difficulty;
    if (tag) query.tags = tag;
    if (q) query.$text = { $search: q };
    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Question.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Question.countDocuments(query)
    ]);
    res.json({ items, total, page: Number(page) });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch questions', error: e.message });
  }
});

// Submit new question (user)
router.post('/', requireAuth, async (req, res) => {
  try {
    const created = await Question.create({ ...req.body, status: 'pending' });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: 'Failed to submit question', error: e.message });
  }
});

// Admin moderation
router.get('/pending', requireAuth, requireAdmin, async (req, res) => {
  const items = await Question.find({ status: 'pending' }).sort({ createdAt: 1 });
  res.json(items);
});

router.post('/:id/approve', requireAuth, requireAdmin, async (req, res) => {
  const updated = await Question.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
  res.json(updated);
});

router.post('/:id/reject', requireAuth, requireAdmin, async (req, res) => {
  const updated = await Question.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
  res.json(updated);
});

export default router;


