import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, enum: ['Aptitude', 'Coding', 'Interview', 'Company Guide', 'Other'], default: 'Other' },
    tags: [{ type: String }],
    content: { type: String, required: true },
    link: { type: String },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
);

resourceSchema.index({ title: 'text', content: 'text', tags: 1, category: 1 });

export default mongoose.model('Resource', resourceSchema);


