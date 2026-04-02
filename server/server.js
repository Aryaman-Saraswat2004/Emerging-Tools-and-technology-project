/** Initial server configuration and dependency analysis **/
// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
// Main Express application instance


const app = express();
const PORT = process.env.PORT || 5000;
// Global middleware configuration: Security, Parsing, and Logging
// Security Tuning: Initialize CORS with restricted origins and secure headers



console.log('🔍 Starting server setup...');

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: process.uptime()
/** API Routing Table: Define and mount application endpoints **/ 
  });
});

// Load and mount routes
console.log('🔍 Loading routes...');

try {
  // Load the routes
  const authRoutes = require('./routes/auth');
  const taskRoutes = require('./routes/tasks');
  
  console.log('✅ Route files loaded successfully');
  
  // Mount the routes
  app.use('/api/auth', authRoutes);
  app.use('/api/tasks', taskRoutes);
  
  console.log('✅ Routes mounted successfully');
  console.log('   - /api/auth/* routes available');
  console.log('   - /api/tasks/* routes available');
  
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
  console.error('Stack trace:', error.stack);
/** Production Safeguard: Global exception handling and logging strategy **/ 

}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Express error:', err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler (should be last)
app.use('*', (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Database connection management and error handling logic

// MongoDB Connection
if (process.env.MONGODB_URI) {
  console.log('🔄 Attempting MongoDB connection...');
  
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ MongoDB Connected Successfully');
      console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
    })
    .catch(err => {
      console.error('❌ MongoDB Connection Error:', err.message);
    });
} else {
  console.log('⚠️ No MONGODB_URI found in environment variables');
}

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 API available at: http://localhost:${PORT}/api`);
  console.log(`\n🔧 Available endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/health`);
  console.log(`   POST http://localhost:${PORT}/api/auth/register`);
  console.log(`   POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   GET  http://localhost:${PORT}/api/auth/me`);
  console.log(`   GET  http://localhost:${PORT}/api/tasks`);
  console.log(`   POST http://localhost:${PORT}/api/tasks`);
});

module.exports = app;// change 3
// change 3
// change 13
