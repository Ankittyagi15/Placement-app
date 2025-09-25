import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['coding', 'mcq'], required: true },
    title: { type: String, required: true },
    source: { type: String, enum: ['LeetCode', 'GFG', 'Custom'], default: 'Custom' },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    tags: [{ type: String }],
    // Coding
    description: { type: String },
    link: { type: String },
    // MCQ
    question: { type: String },
    options: [{ type: String }],
    answerIndex: { type: Number },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'approved' }
  },
  { timestamps: true }
);

questionSchema.index({ title: 'text', tags: 1, difficulty: 1 });

export default mongoose.model('Question', questionSchema);


