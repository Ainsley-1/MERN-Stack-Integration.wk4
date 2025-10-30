# ModernBlog - React Blog Application

A modern, responsive blog application built with React, Vite, and Node.js featuring a clean design, search functionality, and RESTful API.

## 🚀 Project Overview

ModernBlog is a full-stack blog application that provides a seamless reading experience with modern UI/UX design. The application features a responsive layout, article search, and a professional content presentation.

### Tech Stack
- **Frontend**: React 18, Vite, React Router DOM
- **Backend**: Node.js, Express, MongoDB
- **Styling**: Modern CSS with CSS Grid & Flexbox
- **Development**: Concurrently for running full-stack dev environment

## 📋 Prerequisites

Before running this project, ensure you have installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)

## 🛠️ Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd blog-app

# Install root dependencies
npm install

# Install backend dependencies
cd Backend/server
npm install
cd ../..



Environment Configuration
Create a .env file in the Backend/server directory:

env
MONGODB_URI=mongodb://localhost:27017/blog-app
PORT=5003
NODE_ENV=development
3. Database Setup
Ensure MongoDB is running locally or update the MONGODB_URI to your MongoDB Atlas connection string.

4. Running the Application
Development Mode (Recommended)
bash
# Runs both frontend and backend concurrently
npm run dev
Individual Services
bash
# Frontend only (runs on http://localhost:5174)
npm run client

# Backend only (runs on http://localhost:5003)
npm run server
5. Build for Production
bash
# Build frontend
npm run build

# Start production server
npm start
🌐 Application URLs
Frontend: http://localhost:5174

Backend API: http://localhost:5003

API Health Check: http://localhost:5003/api/health

API Test Endpoint: http://localhost:5003/api/test

📚 API Documentation
Base URL
text
http://localhost:5003/api
Endpoints
Health Check
GET /health

Response:

json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-03-15T10:30:00.000Z"
}
Test Endpoint
GET /test

Response:

json
{
  "message": "API is working!",
  "version": "1.0.0"
}
Blog Posts
GET /posts - Get all blog posts

GET /posts/:id - Get single blog post

POST /posts - Create new blog post

PUT /posts/:id - Update blog post

DELETE /posts/:id - Delete blog post

Example Blog Post Schema
json
{
  "id": 1,
  "title": "Getting Started with React",
  "content": "Learn the fundamentals of React...",
  "date": "March 15, 2024",
  "emoji": "⚛️",
  "tags": ["react", "javascript", "webdev"],
  "author": "Admin",
  "readTime": "5 min read"
}
✨ Features Implemented
🎨 Frontend Features
Modern Responsive Design

Mobile-first responsive layout

CSS Grid and Flexbox for complex layouts

Professional color scheme and typography

Smooth animations and transitions

User Interface

Clean, professional navigation bar

Hero section with gradient text

Card-based blog post layout

Search functionality with real-time filtering

Hover effects and micro-interactions

Routing & Navigation

React Router for single-page application

Home and Blog pages

Sticky navigation with active states

🔧 Backend Features
RESTful API Architecture

MongoDB Integration

CORS Configuration

Environment-based Configuration

Health Check Endpoints

📱 Responsive Design
Breakpoints:

Desktop: 1200px+

Tablet: 768px - 1199px

Mobile: 320px - 767px

Features:

Flexible grid system

Responsive typography

Mobile-optimized navigation

Touch-friendly interface

🔍 Search & Filtering
Real-time article search

Case-insensitive matching

Search by title and content

Empty state handling

🗂️ Project Structure
text
blog-app/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Global styles and components
│   ├── main.jsx             # React application entry point
│   └── index.css            # Base styles and CSS variables
├── Backend/
│   └── server/
│       ├── index.js         # Express server setup
│       ├── models/          # MongoDB models
│       ├── routes/          # API routes
│       └── controllers/     # Business logic
├── vite.config.js           # Vite configuration
└── package.json            # Project dependencies and scripts
🎯 Key Components
App.jsx
Main application component with routing

Search functionality state management

Blog post data structure

Blog Grid System
CSS Grid layout for articles

Responsive card components

Hover animations and effects

Navigation
Sticky header with blur effect

Smooth hover transitions

Mobile-responsive menu

🔧 Development Scripts
bash
npm run dev          # Start full-stack development
npm run client       # Start frontend only
npm run server       # Start backend only
npm run build        # Build for production
npm run preview      # Preview production build
🚀 Deployment
Frontend (Vercel/Netlify)
Build the project: npm run build

Deploy the dist folder to your preferred static hosting

Backend (Railway/Heroku)
Set environment variables

Deploy the Backend/server directory

Ensure MongoDB connection is configured

🤝 Contributing
Fork the repository

Create a feature branch: git checkout -b feature/amazing-feature

Commit changes: git commit -m 'Add amazing feature'

Push to branch: git push origin feature/amazing-feature

Open a Pull Request

📄 License
This project is licensed under the MIT License.

🆘 Troubleshooting
Common Issues
Port Already in Use

bash
# Find and kill process using port
npx kill-port 5173
npx kill-port 5003
MongoDB Connection Issues

Ensure MongoDB is running locally

Check connection string in environment variables

Verify network connectivity for Atlas

Proxy Configuration

Ensure Vite config targets correct backend port

Check that backend is running before frontend

Getting Help
Check console for error messages

Verify all dependencies are installed

Ensure environment variables are set correctly
