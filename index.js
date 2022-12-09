
const data = require('./package.json');
const rl = require('readline-sync');

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

function main() {
    console.log(logo + '='.repeat(67));
    console.log('Welcome to the AMS CLI!');
    console.log('please select an option from the menu below:');

    const menu = [
        `Setup Wizard`,
        `Plugin Manager`,
        `Configuration Manager`,
        `Exit`
    ];

    const index = rl.keyInSelect(menu, 'Please select an option:');
    console.log(`You selected ${menu[index]}`);
}


main();
