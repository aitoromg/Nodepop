'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/User');

const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const localConfig = require('../../localConfig.js');

/**
 * POST / 
 * Register user
 */

router.post('/register', (req, res, next) => {
    
    const hash = crypto.createHash('sha256').update(req.body.password).digest('base64');

    var signUpData = {
        email: req.body.email,
        name: req.body.name,
        password: hash,
    }

    User.create(signUpData, (err, user) => {
        if (err) {
            next(err);
            return;
        }

        console.log('Registered user:', user);
        res.json({ success: true, user })
    });

});

/**
 * POST / 
 * Login user
 */

router.post('/login', async (req, res, next) => {
    try {

        const hash = crypto.createHash('sha256').update(req.body.password).digest('base64');

        // collect credentials
        const email = req.body.email;
        const password = hash;

        // search user
        const user = await User.findOne({ email: email }).exec();

        // check user
        if (!user) {
            res.json({ success: true, message: 'Invalid user' });
            return;
        }

        // verify password
        if (password !== user.password) {
            res.json({ success: true, message: 'Invalid password' });
            return;
        }

        // create JWT
        jwt.sign({ user_id: user._id }, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        }, (err, token) => {
            if (err) {
                next(err);
                return;
            }
            // answer client with JWT
            res.json({ success: true, token });
        });
        
    } catch (error) {
        next(err);
    }
});

module.exports = router;