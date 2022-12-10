#!/usr/bin/env node

const updater = require('./helpers/updater');
const fs = require('fs');

if (!fs.existsSync(__dirname + '/cache')) {
    fs.mkdirSync(__dirname + '/cache');
}

if (!fs.existsSync('/bin') {
    fs.mkdirSync('./bin');
}


updater.execute();