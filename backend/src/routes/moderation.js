import { Router } from 'express';
import Feedback from '../models/Feedback.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// List pending feedback
router.get('/pending', requireAuth, requireAdmin, async (req, res) => {
  try {
    const items = await Feedback.find({ status: 'pending' }).sort({ createdAt: 1 });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch pending feedback', error: e.message });
  }
});

router.post('/:id/approve', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: 'Approve failed', error: e.message });
  }
});

router.post('/:id/reject', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: 'Reject failed', error: e.message });
  }
});

export default router;


