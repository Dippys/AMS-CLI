#!/usr/bin/env node

const updater = require('./helpers/updater');
const fs = require('fs');

// how is the __dirname variable defined?
// https://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js

if (!fs.existsSync(__dirname + '/cache')) {
    fs.mkdirSync(__dirname + '/cache');
}

if (!fs.existsSync('/bin')) {
    fs.mkdirSync('./bin');
}


updater.execute();