import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

export default mongoose.model('Feedback', feedbackSchema);


