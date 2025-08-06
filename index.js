require('dotenv').config(); // Load .env variables
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');  

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI environment variable is required');
  process.exit(1);
}

if (!process.env.PORT) {
  console.error('❌ PORT environment variable is required');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET environment variable is required');
  process.exit(1);
}

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  

app.get('/', (req, res) => {
  res.send('Welcome to the Auth API!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  // Start server only after DB is connected
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    console.log('📝 Available routes:');
    console.log('  GET  /');
    console.log('  GET  /api/auth/test');
    console.log('  POST /api/auth/register');
    console.log('  POST /api/auth/login');
    console.log('  GET  /api/auth/profile (Protected)');
    console.log('  PUT  /api/auth/profile (Protected)');
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});