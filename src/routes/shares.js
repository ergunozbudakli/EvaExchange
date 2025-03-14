const express = require('express');
const router = express.Router();
const { Share } = require('../models');

// Update share price function
async function updateSharePrice(symbol, price) {
    const share = await Share.findByPk(symbol);
    if (!share) {
        throw new Error('Share not found');
    }
    if(price < 0) {
        throw new Error('Price cannot be negative');
    }
    share.price = price;

    await share.save();
    return share;
}

// Get all shares
router.get('/', async (rq, rs) => {
    try {
        const shares = await Share.findAll();
        rs.json(shares);
    } catch (error) {
        rs.status(400).json({ message: error.message });
    }
});

// Update share price
router.put('/:symbol/price', async (rq, rs) => {
    try {
        const symbol = rq.params.symbol;
        const price = rq.body.price;
        
        const share = await updateSharePrice(symbol, price);
        rs.json(share);
    } catch (error) {
        
        rs.status(404).json({ message: error.message });
        
    }
});

// Create new share
router.post('/', async (rq, rs) => {
    try {
        const symbol = rq.body.symbol;
        const price = rq.body.price;
        const share = await Share.create({ symbol, price });
        rs.status(201).json(share);
    } catch (error) {
        rs.status(400).json({ message: error.message });
    }
});

module.exports = {
    router,
    updateSharePrice
}; 