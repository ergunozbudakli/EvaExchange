const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Transaction = db.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('BUY', 'SELL'),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  symbol: {
    type: DataTypes.STRING(3),
    allowNull: false
  },
  PortfolioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Transaction;