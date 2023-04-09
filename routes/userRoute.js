const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { users } = require('../model/userModel')
require('dotenv').config();

const userRouter = express.Router()

// User Registeration
userRouter.post('/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await users.findOne({ where: { email } });
        if (existing) {
            res.send('Email-id already registered!')
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send('Error in hashing the password');
                } else {
                    const data = await users.create({
                        name,
                        email,
                        password: hash
                    })
                    res.send(data);
                }
            })
        }
    } catch (err) {
        res.send(err);
    }
})

// User Login
userRouter.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await users.findOne({ where: { email } });
        if (data) {
            bcrypt.compare(password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ user_email: data.email }, process.env.secret_key, { expiresIn: '1hr' });
                    res.send({ 'msg': 'Login Successful', 'token': token })
                } else {
                    res.send('Wrong Credentials!')
                }
            })
        } else {
            res.send('User not found!')
        }
    } catch (err) {
        res.send(err);
    }
})

module.exports = { userRouter }
