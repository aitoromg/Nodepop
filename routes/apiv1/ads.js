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
            filter.name = new RegExp('^' + req.query.name, "i"); // only add the filter when have to filter
        }

        if (sale) {
            filter.sale = sale; // only add the filter when have to filter
        }

        if (price) {
            switch(price) { // only add the filter when have to filter
                case '10-50':
                    filter.price = { '$gte': '10', '$lte': '50' };
                    break;
                case '10-':
                    filter.price = { '$gt': '10' };
                    break;
                case '-50':
                    filter.price = {'$lt': '50' };
                    break;
                case '50':
                    filter.price = '50';
                    break;
            }
        }

        if (tags) {
            filter.tags = tags; // only add the filter when have to filter
        }

        const ads = await Ad.list(filter, skip, limit, fields, sort);
        res.json({ success: true, result: ads });

    } catch (err) {
        next(err);
    }
});

module.exports = router;