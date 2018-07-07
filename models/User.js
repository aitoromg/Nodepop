'use strict';

const mongoose = require('mongoose');

// define schema
var userSchema = mongoose.Schema({
    name: { type: String, index: true, required: [ true, 'User name is required.' ], minlength: [3, 'Min length for name is 3.' ] },
    email: { type: String, unique: true, index: true, required: [ true, 'User email is required.' ], minlength: [3, 'Min length for email is 3.' ] },
    password: { type: String, required: [ true, 'User password is required.' ], minlength: [3, 'Min length for password is 3.' ] }
});

// create model
const User = mongoose.model('User', userSchema);

module.exports = User;