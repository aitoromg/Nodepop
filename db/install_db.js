'use strict';

// load modules
const mongoClient = require('mongoose');
var url = 'mongodb://localhost:27017/nodepop';
// load data
var json = require('./data.json');


mongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    // Check error first
    if (err) {
        return console.log('Error: ', err);
    }

    // Delete users collection
    db.collection('users').deleteMany({}, function(err) {
        // Check error first
        if (err) {
            return console.log('Failed to remove users');
        }

        console.log('Users removed successfully');
    });

    // Delete ads collection
    db.collection('ads').deleteMany({}, function(err) {
        // Check error first
        if (err) {
            return console.log('Failed to remove ads');
        }

        console.log('Ads removed successfully');
    });

    // Delete tags collection
    db.collection('tags').deleteMany({}, function(err) {
        // Check error first
        if (err) {
            return console.log('Failed to remove tags');
        }

        console.log('Tags removed successfully');
    });

    // Add users collection
    db.collection('users').insertMany(json.users, function(err, results) {
        // Check error first
        if (err) {
            return console.log('Failed to add users');
        }

        console.log('Saved users: ', results.ops);
    });

    // Add ads collection
    db.collection('ads').insertMany(json.ads, function(err, results) {
        // Check error first
        if (err) {
            return console.log('Failed to add ads');
        }

        console.log('Saved ads: ', results.ops);
    });

    // Add tags collection
    db.collection('tags').insertMany(json.tags, function(err, results) {
        // Check error first
        if (err) {
            return console.log('Failed to add tags');
            //return console.log(err);
        }

        console.log('Saved tags: ', results.ops);
    });

});