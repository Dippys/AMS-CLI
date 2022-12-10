const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const init = async () => {

    // grab every jar file in the bin folder only and not subfolders
    const files = fs.readdirSync('./bin', { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);

    // filter the files to only get the jar files
    const jarFiles = files.filter(file => file.endsWith('.jar'));

    // filter the jar files to only get the ones that match the regex
    const regex = /^Habbo-(\d+\.\d+\.\d+)-jar-with-dependencies\.jar$/;
    const habboJarFiles = jarFiles.filter(file => regex.test(file));

    
}

function ArcturusLauncher(version){
    const jarFile = path.resolve(`./bin/Habbo-${version}-jar-with-dependencies.jar`);
    const java = spawn('java', ['-jar', jarFile]);


    java.stdout.on('data', data => {
      // The `data` event is emitted whenever the child process
      // writes data to its stdout stream. You can use this event
      // to access the output from the `java` process.
      console.log(`stdout: ${data}`);
    });

    java.stderr.on('data', data => {
      // The `data` event is also emitted when the child process
      // writes data to its stderr stream. You can use this event
      // to access any error messages that the `java` process
      // writes to stderr.
      console.error(`stderr: ${data}`);
    });

    java.on('close', code => {
      // The `close` event is emitted when the child process
      // exits. The `code` argument is the exit code of the
      // child process.
      console.log(`child process exited with code ${code}`);
    });
}

module.exports = {
    name: 'Updater',
    description: 'Start The Emulator',
    version : '1.0.0',
    author : 'Dippys',
    execute() {
    init()
    }
}