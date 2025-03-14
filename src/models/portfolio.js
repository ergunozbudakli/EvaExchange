const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Portfolio = db.define('Portfolio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Portfolio;