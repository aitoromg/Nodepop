'use strict';

const mongoose = require('mongoose');

// define schema
var tagSchema = mongoose.Schema({
    tag: { type: Array }
});

// create model
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;