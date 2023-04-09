const { sequelize } = require('../config/db');
const Sequelize = require('sequelize');

// Creating Table in  Databasae
const users = sequelize.define('users', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
})

module.exports = { users }