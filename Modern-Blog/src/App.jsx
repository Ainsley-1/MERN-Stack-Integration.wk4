import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div>
      <section className="hero">
        <h1>Thoughts, Stories & Ideas</h1>
        <p>
          Welcome to my digital notebook. Exploring the intersection of technology, 
          design, and creative thinking through thoughtful writing.
        </p>
        <Link to="/blog" className="cta-button">
          Read the Blog
        </Link>
      </section>
      
      <section>
        <div className="section-header">
          <h2 className="section-title">Featured Writing</h2>
        </div>
        <div className="blog-grid">
          <div className="blog-card">
            <div className="card-content">
              <h3>The Future of React in 2024</h3>
              <p>
                Exploring the latest features, best practices, and emerging patterns 
                that are shaping modern React development and what it means for developers.
              </p>
              <div className="card-meta">
                <span className="post-date">March 15, 2024</span>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </div>
          </div>
          
          <div className="blog-card">
            <div className="card-content">
              <h3>Design Systems That Scale</h3>
              <p>
                How to build and maintain design systems that empower teams to create 
                consistent, accessible, and beautiful user experiences at scale.
              </p>
              <div className="card-meta">
                <span className="post-date">March 12, 2024</span>
                <a href="#" className="read-more">Read More →</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const blogPosts = [
    {

      title: "Getting Started with React",
      content: "Learn the fundamentals of React and how to build modern web applications with this powerful JavaScript library.",
      date: "March 15, 2024",
      image: "https://k2bindia.com/wp-content/uploads/2015/08/React.png"
    },
    {
      id: 2,
      title: "Mastering CSS Grid",
      content: "Discover how to create complex, responsive layouts with CSS Grid and take your web design skills to the next level.",
      date: "October, 2025",
      emoji: "🎯"
    },
    {
      id: 3,
      title: "The Future of Web Development",
      content: "Explore the latest trends and technologies shaping the future of web development in 2024 and beyond.",
      date: " October, 2025",
      emoji: "🚀"
    },
    {
      id: 4,
      title: "TypeScript Best Practices",
      content: "A comprehensive guide to writing clean, maintainable TypeScript code that scales with your team.",
      date: "October, 2025",
      emoji: "📘"
    },
    {
      id: 5,
      title: "Building Accessible Web Applications",
      content: "Why accessibility matters and how to build web applications that everyone can use regardless of ability.",
      date: "October, 2025",
      emoji: "♿"
    },
    {
      id: 6,
      title: "Performance Optimization Techniques",
      content: "Advanced strategies for optimizing web application performance and delivering lightning-fast user experiences.",
      date: "October, 2025",
      emoji: "⚡"
    }
  ];

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">All Articles</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search articles..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <h3>No articles found</h3>
          <p>Try adjusting your search terms to find what you're looking for.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {filteredPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div className="card-content">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div className="card-meta">
                  <span className="post-date">{post.date}</span>
                  <a href="#" className="read-more">Read More →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="logo">
              Modern<span className="logo-accent">Blog</span>
            </Link>
            <ul className="nav-links">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/blog" className="nav-link">Articles</Link></li>
              <li><a href="#" className="nav-link">About</a></li>
              <li><a href="#" className="nav-link">Contact</a></li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;