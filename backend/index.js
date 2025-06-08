require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');


const translateRoutes = require('./routes/translateRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use(ClerkExpressWithAuth());

app.get('/api/dashboard', (req, res) => {
  const userId = req.auth?.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.json({ message: `Welcome to your dashboard, user ${userId}!` });
});

app.use('/api', translateRoutes);


app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});