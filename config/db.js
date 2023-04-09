const { Sequelize } = require('sequelize')
require('dotenv').config()

// Connection with SQL Database
const sequelize = new Sequelize('day4assignment', 'root', process.env.password, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = { sequelize }