const express = require('express');
const router = express.Router();
const { Portfolio, Transaction, Share } = require('../models');

// Calculate share details
const calculateShareDetails = (transactions) => {
    const details = {};
    
    transactions.forEach(transaction => {
        const { symbol, type, quantity, price, Share } = transaction;
        
        if (!details[symbol]) {
            details[symbol] = {
                quantity: 0,
                cost: 0,
                currentPrice: Share.price
            };
        }

        const multiplier = type === 'BUY' ? 1 : -1;
        details[symbol].quantity += quantity * multiplier;
        details[symbol].cost += price * quantity * multiplier;
    });

    return details;
};

// Calculate portfolio summary
const calculatePortfolioSummary = (shareDetails) => {
    let totalValue = 0;
    let totalProfitLoss = 0;

    Object.entries(shareDetails).forEach(([symbol, detail]) => {
        if (detail.quantity > 0) {
            const currentValue = detail.quantity * detail.currentPrice;
            const profitLoss = currentValue - detail.cost;

            detail.currentValue = currentValue;
            detail.averageCost = detail.cost / detail.quantity;
            detail.profitLoss = profitLoss;

            totalValue += currentValue;
            totalProfitLoss += profitLoss;
        }
    });

    return { totalValue, totalProfitLoss };
};

// Get all portfolios
router.get('/', async (req, res) => {
    try {
        const portfolios = await Portfolio.findAll();
        res.json(portfolios);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get portfolio details
router.get('/:id/details', async (req, res) => {
    try {
        const portfolio = await Portfolio.findByPk(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const transactions = await Transaction.findAll({
            where: { PortfolioId: req.params.id },
            include: [{ model: Share }]
        });

        const shares = calculateShareDetails(transactions);
        const { totalValue, totalProfitLoss } = calculatePortfolioSummary(shares);

        res.json({
            portfolioId: portfolio.id,
            name: portfolio.name,
            shares,
            totalValue,
            totalProfitLoss
        });

    } catch (error) {
        console.error('Error getting portfolio details:', error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;