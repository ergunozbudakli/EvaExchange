const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { db } = require('./models');
const createData = require('./config/createData');
const startPriceUpdates = require('./utils/priceScheduler');
const transactionRoutes = require('./routes/transactions');
const { router: shareRoutes } = require('./routes/shares');
const portfolioRoutes = require('./routes/portfolios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/shares', shareRoutes);
app.use('/api/portfolios', portfolioRoutes);
// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to EvaExchange API' });
});

// Database synchronization and seeding
db.sync({ force: true })
  .then(() => {
    console.log('Database tables created successfully');
    return createData();
  })
  .then(() => {
    // Start price updates after database is ready
    startPriceUpdates();
    console.log('Price updates scheduled');
  })
  .catch((err) => {
    console.error('Error:', err);
  });

// Port setting
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 