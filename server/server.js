const net = require('net');
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const blessed = require('blessed');

const socketPath = path.resolve('/tmp', 'unix.socket');

var server;

fs.stat(socketPath, function(err, stats) {
    if (err) {
        console.log('No socket found.');
        return createServer();
    }

    console.log('Removing leftover socket.')
    fs.unlink(socketPath, function(err){
        if(err) return console.log(err);
        createServer();
    });
});


function createServer() {
    console.log('Starting Server!');
    server = net.createServer(function(socket) {
        console.log('Connection open!');

        var screen = blessed.screen({

        });

        var textArea = blessed.textarea({
            inputOnFocus: true,
        });
        screen.append(textArea);

        textArea.key(['escape', 'C-c'], function(ch, key) {
            return terminate();
        });

        socket.on('data', function(data) {
            textArea.setContent(reverseString(data.toString()));
            screen.render();
        });

        socket.on('end', function() {
            console.error('Client disconnected.');
            return terminate();
        });

        socket.on('error', function(err){
            console.error(err);
            return terminate();
        });
    })
    .listen(socketPath)
    .on('connection', function(socket) {
        console.log('Client connected!');
    });
}

function reverseString(str) {
    let nl = '';
    if (str.indexOf("\n") !== -1) {
        nl = str.substring(str.indexOf("\r"));
        str = str.trim();
    }

    var splitString = str.split("");

    var reverseArray = splitString.reverse();

    var joinArray = reverseArray.join("");

    return joinArray + nl;
}

function terminate() {
    console.log('\n',"Terminating.",'\n');
    process.exit(1);
}
