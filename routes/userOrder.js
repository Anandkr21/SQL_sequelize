const express = require('express');
const { authentication } = require('../middleware/authentication');
const { orders } = require('../model/orderModel')
const userOrder = express.Router();

// CRUD operataion strats from here

// Create
userOrder.post('/orders/create', authentication, async (req, res) => {
    try {
        const { name, quantity, total_price } = req.body;
        const data = await orders.create({
            name,
            quantity,
            total_price,
            email
        })
        res.send(data);
    } catch (err) {
        res.send(err);
    }
})

// Read
userOrder.get('/orders', authentication, async (req, res) => {
    try {
        const data = await orders.findAll();
        res.send(data)
    } catch (err) {
        res.send(err);
    }
})

// Update
userOrder.patch('/orders/update/:id', authentication, async (req, res) => {
    try {
        const { quantity, total_price } = req.body;
        const data = await orders.upsert({
            id: req.params.id,
            quantity,
            total_price
        })
        res.send(data);
    } catch (err) {
        res.send(err);
    }
})

// Delete
userOrder.delete('/orders/delete/:id', authentication, async (req, res) => {
    try {
        const data = await orders.destroy({
            where: {
                id: req.params.id
            }
        });
        res.send(await orders.findAll());
    } catch (err) {
        res.send(err);
    }
})

module.exports = { userOrder }