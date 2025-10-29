import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import Post from '../models/Post.js';
import Category from '../models/Category.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET /api/posts - Get all posts with pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('search').optional().trim(),
  query('category').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search;
    const category = req.query.category;

    let query = { isPublished: true };
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) {
        query.categories = categoryDoc._id;
      }
    }

    const posts = await Post.find(query)
      .populate('categories', 'name slug')
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/posts/:id - Get single post
router.get('/:id', [
  param('id').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id)
      .populate('categories', 'name slug')
      .populate('author', 'username');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/posts - Create new post (protected)
router.post('/', [
  auth,
  body('title').trim().isLength({ min: 3 }).escape(),
  body('content').trim().isLength({ min: 10 }),
  body('excerpt').optional().trim().isLength({ max: 200 }),
  body('categories').optional().isArray(),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = new Post({
      ...req.body,
      author: req.user.id
    });

    const savedPost = await post.save();
    await savedPost.populate('categories', 'name slug');
    await savedPost.populate('author', 'username');

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/posts/:id - Update post (protected)
router.put('/:id', [
  auth,
  param('id').isMongoId(),
  body('title').optional().trim().isLength({ min: 3 }).escape(),
  body('content').optional().trim().isLength({ min: 10 }),
  body('excerpt').optional().trim().isLength({ max: 200 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('categories', 'name slug').populate('author', 'username');

    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/posts/:id - Delete post (protected)
router.delete('/:id', [
  auth,
  param('id').isMongoId()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/posts/:id/comments - Add comment to post
router.post('/:id/comments', [
  param('id').isMongoId(),
  body('author').trim().isLength({ min: 2 }),
  body('content').trim().isLength({ min: 3 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push(req.body);
    await post.save();

    res.status(201).json(post.comments[post.comments.length - 1]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;