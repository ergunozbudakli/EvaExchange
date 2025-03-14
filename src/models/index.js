const db = require('../config/database');


// Model tanımlamaları
const Share = require('./share');
const Portfolio = require('./portfolio');
const Transaction = require('./transaction');

// İlişkileri tanımla
Transaction.belongsTo(Portfolio, {
    foreignKey: 'PortfolioId',
    onDelete: 'CASCADE'
});

Transaction.belongsTo(Share, {
    foreignKey: 'symbol'
});

module.exports = {
    db,
    Share,
    Portfolio,
    Transaction
}; 