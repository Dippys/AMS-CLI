const fs = require('fs');
const https = require('https');
const axios = require('axios');
const AdmZip = require('adm-zip');
const data = require('../package.json');
const main = require('./main');

const logo = ` $$$$$$\\  $$\\      $$\\  $$$$$$\\         $$$$$$\\  $$\\       $$$$$$\\ 
$$  __$$\\ $$$\\    $$$ |$$  __$$\\       $$  __$$\\ $$ |      \\_$$  _|
$$ /  $$ |$$$$\\  $$$$ |$$ /  \\__|      $$ /  \\__|$$ |        $$ |  
$$$$$$$$ |$$\\$$\\$$ $$ |\\$$$$$$\\        $$ |      $$ |        $$ |  
$$  __$$ |$$ \\$$$  $$ | \\____$$\\       $$ |      $$ |        $$ |  
$$ |  $$ |$$ |\\$  /$$ |$$\\   $$ |      $$ |  $$\\ $$ |        $$ |  
$$ |  $$ |$$ | \\_/ $$ |\\$$$$$$  |      \\$$$$$$  |$$$$$$$$\\ $$$$$$\\ 
\\__|  \\__|\\__|     \\__| \\______/        \\______/ \\________|\\______|
                                                             ${data.version}
`;


const init = async () => {

    
    const packageJson = fs.readFileSync('package.json', 'utf8');
    const { version } = JSON.parse(packageJson);

    // create a loading screen
    console.log(logo + '='.repeat(67));
    console.log('Checking for updates...');
    console.log('Please wait...');
    console.log('='.repeat(67));
    // check for updates
    https.get('https://raw.githubusercontent.com/Dippys/AMS-CLI/main/package.json', (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const latest = JSON.parse(data).version;
            if (latest !== version) {
                downloadAndExtractZip();
            } else {
                main.execute();
            }
        });
    }).on('error', (err) => {
        console.log('Error: ' + err.message);
    });

}

const downloadAndExtractZip = async () => {
    const url = 'https://github.com/Dippys/AMS-CLI/archive/refs/heads/main.zip';
    const filePath = './cache/main.zip';
    const extractedPath = './cache/';

    // while the cache folder is not empty play an animation
    const animation = ['|', '/', '-', '\\'];
    while (fs.readdirSync('./cache').length > 0) {
        for (let i = 0; i < animation.length; i++) {
            process.stdout.write(`\r${animation[i]} Downloading...`);
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }

    // Step 0: Delete the cache folder and create a new one
    if (fs.existsSync('./cache')) {
        fs.rmSync('./cache', { recursive: true });
    }

    fs.mkdirSync('./cache');
  
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
        // if the file already exists, delete it
        if (fs.existsSync(`./${file}`)) {
            fs.rmSync(`./${file}`, { recursive: true });
        }
        fs.renameSync(`./cache/${file}`, `./${file}`);
    });

    // delete the contents of the cache folder (except the .gitkeep file)
    fs.readdirSync('./cache').forEach(file => {
        if (file !== '.gitkeep') {
            fs.rmSync(`./cache/${file}`, { recursive: true });
        }
    });
    
};

module.exports = {
    name: 'Updater',
    description: 'Updater for AMS-CLI',
    version : '1.0.0',
    author : 'Dippys',
    execute() {
    init();
    }
  };