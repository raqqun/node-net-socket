const net = require('net');
const path = require('path');
const fs = require('path');
const readline = require('readline');
const blessed = require('blessed');

const socketPath = path.resolve('/tmp', 'unix.socket');

let inputBuffer = '',
    client;

client = net.createConnection(socketPath)
    .on('connect', function() {
        console.log('Connected!\n');

        var screen = blessed.screen({

        });

        var textArea = blessed.textarea({
            inputOnFocus: true,
            width: (screen.cols > 100) ? Math.round((100 / screen.cols) * 100) + '%' : '100%'
        });
        screen.append(textArea);

        textArea.key(['escape', 'C-c'], function(ch, key) {
            return terminate();
        });

        textArea.key(['backspace'], function(ch, key) {
            inputBuffer = inputBuffer.slice(0, -1);
            if (inputBuffer.length === 0) {
                inputBuffer = ' ';
            }

            client.write(inputBuffer);

        });

        textArea.on('keypress', function(ch, key) {
            if (key.name !== 'backspace') {
                if (!client.destroyed) {
                    inputBuffer += ch;

                    client.write(inputBuffer);
                }
            }
        });

        screen.render();
    })
    .on('data', function(data) {

    })
    .on('error', function(err) {
        console.error(err.message);
        return terminate();
    })
    .on('close', function(data) {
        console.error('\n*** Connection closed. ***\n');
        return terminate();
    });

function terminate() {
    console.error('\n',"Terminating.",'\n');
    client.destroy();
    process.exit(1);
}
