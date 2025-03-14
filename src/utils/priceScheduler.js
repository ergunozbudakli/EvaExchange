const schedule = require('node-schedule');
const { Share } = require('../models');
const { updateSharePrice } = require('../routes/shares');


function getRandomPrice(currentPrice) {
    const change = Math.random() * 10 - 5; // between -5 and 5 random price change
    const newPrice = Number(currentPrice) + change;
    // If new price is less than 0, keep the current price
    return newPrice > 0 ? Number(newPrice.toFixed(2)) : Number(currentPrice);
}

// Hourly price update
function startPriceUpdates() {
    // Run every hour ('0 * * * *')
    schedule.scheduleJob('0 * * * *', async () => {
        try {
            const shares = await Share.findAll();
            
            for(const share of shares) {
                const newPrice = getRandomPrice(share.price);
                await updateSharePrice(share.symbol, newPrice);
                console.log(`${share.symbol} price updated to ${newPrice}`);
            }
        } catch (error) {
            console.error('Error updating prices:', error);
        }
    });
    
    console.log('Hourly price updates scheduled');
}

module.exports = startPriceUpdates; 