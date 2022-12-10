const launcher = require("../helpers/launcher");

function init(){
    launcher.execute();
}

module.exports = {
    name: 'Launcher',
    description: 'Java Launcher',
    version : '1.0.0',
    author : 'Dippys',
    position : 1,
    execute() {
        init()
    }
}
