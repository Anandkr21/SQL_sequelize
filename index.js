const express = require('express');
const { sequelize } = require("./config/db");
const { userRouter } = require('./routes/userRoute');
const { userOrder } = require('./routes/userOrder');

require('dotenv').config();

const app = express();
app.use(express.json());

// Basic endpoint for checking
app.get('/', (req, res) => {
    res.send('welcome')
})

// Routes goes here
app.use('/', userRouter);
app.use('/', userOrder);

// Connection with Server
app.listen(process.env.port, async () => {
    try {
        await sequelize.sync();
        console.log('Connected to SQL DB !')
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running at http://localhost:${process.env.port}`)
})
