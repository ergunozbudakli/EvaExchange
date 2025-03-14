const express = require('express');
const router = express.Router();
const { Transaction, Share } = require('../models');
// Get all shares
router.get('/', async (rq, rs) => {
    try {
        const transaction = await Transaction.findAll();
        rs.json(transaction);
    } catch (error) {
        rs.status(400).json({ message: error.message });
    }
});
router.get('/:PortfolioId', async (rq, rs) => {
    try {
        const transactions = await Transaction.findAll({where: {PortfolioId: rq.params.PortfolioId}});
        rs.json(transactions);
    } catch (error) {
        rs.status(400).json({ message: error.message });
    }
});
// Buy share
router.post('/buy', async (req, res) => {
    try {
        const { portfolioId, symbol, quantity } = req.body;
        const share = await Share.findByPk(symbol);
        
        const transaction = await Transaction.create({
            type: 'BUY',
            quantity,
            price: share.price,
            PortfolioId: portfolioId,
            symbol: symbol
        });

        res.json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Sell share
router.post('/sell', async (req, res) => {
    try {
        const { portfolioId, symbol, quantity } = req.body;
        const share = await Share.findByPk(symbol);

        // Check available shares
        const shares = await Transaction.findAll({
            where: { PortfolioId: portfolioId, symbol: symbol }
        });

        let available = 0;
        shares.forEach(t => {
            if(t.type === 'BUY') available += t.quantity;
            if(t.type === 'SELL') available -= t.quantity;
        });

        if(available < quantity) {
            return res.status(400).json({ message: 'Not enough shares' });
        }

        const transaction = await Transaction.create({
            type: 'SELL',
            quantity,
            price: share.price,
            PortfolioId: portfolioId,
            symbol: symbol
        });

        res.json(transaction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;