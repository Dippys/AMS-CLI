function init() {
    console.log('Hello World')
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
