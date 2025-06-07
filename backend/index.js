require('dotenv').config();
const express = require('express');
const cors = require('cors');
const translateRoutes = require('./routes/translateRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', translateRoutes);  // e.g., POST /api/translate

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
