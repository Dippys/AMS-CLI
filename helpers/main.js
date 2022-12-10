
const data = require('../package.json');
const fs = require('fs');
const rl = require('readline-sync');
const commands = fs.realpathSync('./commands');


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


const main = async () => {

    console.clear();
    console.log(logo + '='.repeat(67));
    console.log('Welcome to the AMS CLI!');
    console.log('please select an option from the menu below:');

    // Get all the files in the commands folder only ending with .js
    const commandFiles = fs.readdirSync(commands).filter(file => file.endsWith('.js'));

    // Loop through the files and get the name and description and version and add it to the menu
    // based on the position
    const menu = [];
    for (const file of commandFiles) {
        const command = require(`${commands}/${file}`);
        menu.push({ name: command.name, description: command.description, version: command.version, author: command.author });
    }

    // Sort the menu based on the position
    menu.sort((a, b) => (a.position > b.position) ? 1 : -1);

    // for each file in the commands folder, we need to add it to dictionary
    // store the filename and the name of the command
    // get the filename from the ./commands folder

    var dictionary = {};
    for (const file of commandFiles) {
        const command = require(`${commands}/${file}`);
        dictionary[command.name] = file;
    }




    // Create a menu with the options
    const index = rl.keyInSelect(menu.map(x => x.name), 'Select an option:');
    const selectedOption = menu[index];

    // If the user selected an option, execute the command
    if (index !== -1) {
        const command = require(`${commands}/${dictionary[selectedOption.name]}`);
        command.execute();
    } else {
        console.log('You have exited the application');
    }

}

module.exports = {
    name: 'main',
    description: 'The Main Menu',
    version : '1.0.0',
    author : 'Dippys',
    execute() {
    main();
    }
}