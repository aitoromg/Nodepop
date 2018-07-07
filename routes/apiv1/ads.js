'use strict';

const express = require('express');
const router = express.Router();

const Ad = require('../../models/Ad');

const jwtAuth = require('../../lib/jwtAuth');

/**
 * GET / 
 * Retrieve a list of ads
 */

router.get('/', jwtAuth(), async (req, res, next) => {
    try {
        // who is the user?
        const user_id = req.user_id;
        console.log('Authenticated user is:', user_id);

        // pagination
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);

        // filters
        const name = req.query.name;
        const sale = req.query.sale;
        const price = req.query.price;
        const tags = req.query.tags;
        const fields = req.query.fields;

        // sort
        const sort = req.query.sort;

        // create empty filter
        const filter = {};

        if (name) {
            filter.name = name; // only add the filter when have to filter
        }

        if (sale) {
            filter.sale = sale; // only add the filter when have to filter
        }

        if (price) {
            filter.price = price; // only add the filter when have to filter
        }

        if (tag) {
            filter.tag = tag; // only add the filter when have to filter
        }

        const ads = await Ad.list(filter, skip, limit, fields, sort);
        res.json({ success: true, result: ads });

    } catch (err) {
        next(err);
    }
});

module.exports = router;