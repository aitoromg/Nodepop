'use strict';

const mongoose = require('mongoose');

// define schema
var adSchema = mongoose.Schema({
    name: { type: String, index: true },
    sale: { type: Boolean, index: true },
    price: { type: Number, index: true },
    photo: { type: String, index: true },
    tags: { type: Array, index: true }
});

adSchema.index({ name: 1, sale: 1, price: 1, tags: 1 });

// static method
adSchema.statics.list = function(filter, skip, limit, fields, sort, tags) {

    // create query without execute
    const query = Ad.find(filter);

    // add pagination
    query.skip(skip);
    query.limit(limit);    

    // make select
    query.select(fields);

    // sort is executed before pagination
    query.sort(sort);

    // execute query and return the promise
    return query.exec(tags);
}

// filter by tag
adSchema.statics.tagsList = (tags) => {
    const query = Ad.distinct('tags');

    // execute query
    query.exec(tags);
};

// create model
const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;