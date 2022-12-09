const fs = require('fs');
const https = require('https');
const unzipper = require('unzipper');
const axios = require('axios');
const AdmZip = require('adm-zip');

const downloadAndExtractZip = async () => {
    const url = 'https://github.com/Dippys/AMS-CLI/archive/refs/heads/main.zip';
    const filePath = './cache/main.zip';
    const extractedPath = './cache/';
  
    // Step 1: Download the zip file
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(filePath, response.data);

    // wait for the file to be downloaded
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Step 2: Extract the zip file into the cache folder
    const zip = new AdmZip(filePath);
    zip.extractAllTo(extractedPath, true);

    // wait for the file to be extracted
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // move all the files from the AMS-Cli-main folder to the cache folder
    fs.readdirSync('./cache/AMS-CLI-main').forEach(file => {
        // ignore all files that start with a dot
        if (!file.startsWith('.')) {
            fs.renameSync(`./cache/AMS-CLI-main/${file}`, `./cache/${file}`);
        }
    });

    // delete the AMS-CLI-main folder
    fs.rmSync('./cache/AMS-CLI-main', { recursive: true });

    // delete the zip file
    fs.unlinkSync(filePath);

    // move all the files from the cache folder to the root folder even if they already exist
    fs.readdirSync('./cache').forEach(file => {
        // ignore all files that start with a dot
        if (!file.startsWith('.')) {
            fs.renameSync(`./cache/${file}`, `./${file}`, { overwrite: true });
        }
    });

    // delete the contents of the cache folder (except the .gitkeep file)
    fs.readdirSync('./cache').forEach(file => {
        if (file !== '.gitkeep') {
            fs.rmSync(`./cache/${file}`, { recursive: true });
        }
    });
    
  };

module.exports = {
    downloadAndExtractZip,
  };