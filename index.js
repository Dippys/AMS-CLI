const updater = require('./helpers/updater');
const fs = require('fs');

// if it doesn't exist, create the cache folder and bin folder
if (!fs.existsSync('./cache')) {
    fs.mkdirSync('./cache');
}
if (!fs.existsSync('./bin')) {
    fs.mkdirSync('./bin');
}

updater.execute();