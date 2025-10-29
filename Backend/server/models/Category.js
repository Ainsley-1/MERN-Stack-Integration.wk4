import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  }
}, {
  timestamps: true
});

categorySchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name.toLowerCase().replace(/ /g, '-');
  }
  next();
});

export default mongoose.model('Category', categorySchema);