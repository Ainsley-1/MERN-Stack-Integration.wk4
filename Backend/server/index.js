import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import postRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import uploadRoutes from './routes/upload.js';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/upload', uploadRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend server is working!',
    timestamp: new Date().toISOString(),
    status: 'OK'
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    environment: process.env.NODE_ENV
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app');
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    return false;
  }
};

// Function to start server with automatic port handling
const startServer = async () => {
  const isConnected = await connectDB();
  if (!isConnected) {
    console.log('❌ Failed to connect to MongoDB');
    return;
  }

  const tryPort = (port) => {
    const server = app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV}`);
      console.log(`📝 Test URL: http://localhost:${port}/api/test`);
      console.log(`❤️  Health URL: http://localhost:${port}/api/health`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`⚠️  Port ${port} is busy, trying port ${port + 1}...`);
        tryPort(port + 1);
      } else {
        console.error('❌ Server error:', err);
      }
    });
  };

  // Start with port 5001 to avoid conflicts
  const startPort = 5001;
  console.log(`🎯 Attempting to start server on port ${startPort}...`);
  tryPort(startPort);
};

// Start the server
startServer();