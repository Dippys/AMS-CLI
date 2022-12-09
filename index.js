
const data = require('./package.json');
const fs = require('fs');
const rl = require('readline-sync');
const https = require('https');
const { downloadAndExtractZip } = require('./helpers/updater');


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

// if it doesn't exist, create the cache folder and bin folder
if (!fs.existsSync('./cache')) {
    fs.mkdirSync('./cache');
}
if (!fs.existsSync('./bin')) {
    fs.mkdirSync('./bin');
}

function main() {
    console.clear();
    console.log(logo + '='.repeat(67));
    console.log('Welcome to the AMS CLI!');
    console.log('please select an option from the menu below:');

    const menu = fs.readdirSync('./commands').filter(file => file.endsWith('.js')).map(file => {
        const command = require(`./commands/${file}`);
        return command.description;
    });
        

    const index = rl.keyInSelect(menu, 'Please select an option:');
    if (index === -1) {
        console.log('Exiting');
        process.exit();
    }
    const command = require(`./commands/${fs.readdirSync('./commands').filter(file => file.endsWith('.js'))[index]}`);
    command.execute();
}

function init() {

    const packageJson = fs.readFileSync('package.json', 'utf8');
    const { version } = JSON.parse(packageJson);

    // create a loading screen
    console.log(logo + '='.repeat(67));
    console.log('Checking for updates...');
    console.log('Please wait...');
    console.log('='.repeat(67));
    // check for updates
    https.get('https://raw.githubusercontent.com/Dippys/AMS-CLI/main/package.json?token=GHSAT0AAAAAAB4CYTACUE7ZQKYR7GMPS4LSY4TL2IA', (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const latest = JSON.parse(data).version;
            if (latest !== version) {
                downloadAndExtractZip();
            } else {
                main();
            }
        });
    }).on('error', (err) => {
        console.log('Error: ' + err.message);
    });
};

init();
