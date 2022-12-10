const Updater = require('../helpers/updater')

function init() {
    Updater.execute()
}

module.exports = {
    name: 'Updater',
    description: 'Java Launcher',
    version : '1.0.0',
    author : 'Dippys',
    position : 3,
    execute() {
        init()
    }
}
