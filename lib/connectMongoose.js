'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

conn.on('error', err => {
    console.log('Error de mongodb', err);
});

conn.once('open', () => {
    console.log('Conectado a MongoDB en', conn.name);
});

mongoose.connect('mongodb://localhost:27017/nodepop', { useNewUrlParser: true });

module.exports = conn;