function init() {
    console.log('Hello World')
}

module.exports = {
    name: 'Setup Wizzard',
    description: 'Setup the wizzard',
    version : '1.0.0',
    author : 'Dippys',
    position : 2,
    execute() {
        init()
    }
}
