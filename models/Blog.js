// models/Post.js
import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [120, 'Title cannot exceed 120 characters'],
    trim: true
  },
  // slug: {
  //   type: String,
  //   required: true,
  //   index: true
  // },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [100, 'Content must be at least 100 characters']
  },
  excerpt: {
    type: String,
    maxlength: [200, 'Excerpt cannot exceed 200 characters']
  },
  // author: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  featuredImage: {
    type: String,
    default: ''
  },
  tags: [{
    type: String,
    enum: ['technology', 'programming', 'web-development', 'design', 'career']
  }],
  // status: {
  //   type: String,
  //   enum: ['draft', 'published'],
  //   default: 'draft'
  // },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted date
BlogSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Pre-save hook to generate slug
// BlogSchema.pre('save', async function(next) {
//   if (!this.isModified('title')) return next();
  
//   const slug = this.title
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/(^-|-$)+/g, '');
  
//   // Make slug unique
//   const slugRegex = new RegExp(`^(${slug})((-[0-9]*$)?$`, 'i');
//   const postsWithSlug = await this.constructor.find({ slug: slugRegex });
  
//   if (postsWithSlug.length) {
//     this.slug = `${slug}-${postsWithSlug.length + 1}`;
//   } else {
//     this.slug = slug;
//   }
  
//   next();
// });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);