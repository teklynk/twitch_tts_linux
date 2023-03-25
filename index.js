const tmi = require('tmi.js');
const fs = require('fs');

const ttsFile = './tts.txt';
const modsOnly = false;
const channelName = 'teklynk';
const ttsCommand = '!tts';

const client = new tmi.Client({

	channels: [channelName]

});

client.connect();

client.on('message', (channel, user, message, self) => {

    // Ignore echoed messages
    if (self) {

        return false;

    }

    if (user['message-type'] === 'chat' && message.startsWith(ttsCommand + " ")) {

        if (modsOnly === true && (user.mod || user.username.toLowerCase() === channelName.toLowerCase().trim())) {

            writeMessage(ttsFile, message, true);

        } else if (modsOnly === false || user.username.toLowerCase() === channelName.toLowerCase().trim()) {

            writeMessage(ttsFile, message, true);

        }

    }

});

function writeMessage(file, chatmessage, blocking) {

    chatmessage = chatmessage.substring(ttsCommand.length).trim();

    // If True, don't write to file if file already has contents.
    if (blocking === true) {

        let readFile = fs.readFileSync(file).toString();

        if (readFile.length > 0) {

            return false;

        } else {

            fs.writeFileSync(file, chatmessage);

        }

    } else {

        fs.writeFileSync(file, chatmessage);

    }

}