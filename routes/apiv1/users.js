'use strict';

const express = require('express');
const router = express.Router();

const User = require('../../models/User');

const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const localConfig = require('../../localConfig');

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
            console.log(err);
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
        // collect credentials
        const email = req.body.email;
        const password = req.body.password;

        // search user
        const user = await User.findOne({ email: email }).exec();

        // check user
        if (!user) {
            res.json({ success: true, code: 401, message: res.__('Invalid_credentials') });
            return;
        }

        // verify password
        if (password !== user.password) {
            res.json({ success: true, code: 401, message: res.__('Invalid_credentials') });
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
        
    } catch (err) {
        next(err);
    }
});

module.exports = router;