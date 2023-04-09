const { sequelize } = require('../config/db');
const Sequelize = require('sequelize');

// Creating Table in  Databasae
const orders = sequelize.define('orders', {
    name: Sequelize.STRING,
    quantity: Sequelize.INTEGER,
    total_price: Sequelize.INTEGER,
    email: Sequelize.STRING
});

module.exports = { orders }