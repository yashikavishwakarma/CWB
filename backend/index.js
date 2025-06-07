require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const connectDB = require('./config/db');
const pdfRoutes = require('./routes/pdfRoutes');

const translateRoutes = require('./routes/translateRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Add Clerk middleware here
app.use(ClerkExpressWithAuth());

// ✅ Test protected route
app.get('/api/dashboard', (req, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json({ message: `Welcome to your dashboard, user ${userId}!` });
});

// 👇 Your existing routes
app.use('/api', translateRoutes);

app.use('/api/pdfs', pdfRoutes);

// 👇 Error handler
app.use(errorHandler);

connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
