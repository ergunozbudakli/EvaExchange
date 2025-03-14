const { Share, Portfolio } = require('../models');

async function createData() {
    try {
        // Create sample shares
        await Share.create({ symbol: 'THY', price: 50.00 });
        await Share.create({ symbol: 'BTC', price: 100.00 });
        await Share.create({ symbol: 'ETH', price: 75.00 });
        await Share.create({ symbol: 'ERG', price: 15.00 });
        await Share.create({ symbol: 'BGM', price: 25.00 });
        // Create sample portfolio
        await Portfolio.create({ id: 1, name: 'Test1 Portfolio' });
        await Portfolio.create({ id: 2, name: 'Test2 Portfolio' });
        await Portfolio.create({ id: 3, name: 'Test3 Portfolio' });
        await Portfolio.create({ id: 4, name: 'Test4 Portfolio' });
        await Portfolio.create({ id: 5, name: 'Test5 Portfolio' });
        console.log('Sample data created successfully');
    } catch (error) {
        console.error('Error creating data:', error);
    }
}

module.exports = createData; 