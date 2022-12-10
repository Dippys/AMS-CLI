#!/usr/bin/env node

const updater = require('./helpers/updater');
const fs = require('fs');

// if it doesn't exist, create the cache folder and bin folder
if (!fs.existsSync(__dirname + '/cache')) {
    fs.mkdirSync(__dirname + + '/cache');
}

// check if this is being run as a global package or not
if (!fs.existsSync(__dirname + '/bin')) {
    fs.mkdirSync('./bin');
}



updater.execute();