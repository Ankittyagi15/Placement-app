import { Router } from 'express';
import Resource from '../models/Resource.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// List with search/filter/sort/pagination
router.get('/', async (req, res) => {
  try {
    const { q, category, tag, sort = 'createdAt:desc', page = 1, limit = 10 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (q) query.$text = { $search: q };

    const [sortField, sortDir] = sort.split(':');
    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Resource.find(query)
        .sort({ [sortField]: sortDir === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(Number(limit)),
      Resource.countDocuments(query)
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch resources', error: e.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await Resource.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: 'Fetch failed', error: e.message });
  }
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const created = await Resource.create(req.body);
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: 'Create failed', error: e.message });
  }
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: 'Update failed', error: e.message });
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ message: 'Delete failed', error: e.message });
  }
});

export default router;


