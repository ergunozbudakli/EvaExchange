const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Share = db.define('Share', {
  symbol: {
    type: DataTypes.STRING(3),
    primaryKey: true,
    validate: {
      isUppercase: true
    }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

module.exports = Share;