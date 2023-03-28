const tmi = require('tmi.js');
const execSync = require('child_process').execSync;

// Settings
const processName = 'espeak';
const speechCommand = 'espeak -p 25 -s 125 -v en-french+15';
const modsOnly = true;
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

    if (user['message-type'] === 'chat' && message.startsWith(ttsCommand + ' ')) {

        // Escape apostrophes and single quotes 
        message = message.replace(/'/g, 'A');

        // Synchronously execute the speechCommand. This acts like a queue/buffer. 
        if (modsOnly && (user.mod || user.username.toLowerCase() === channelName.toLowerCase().trim())) {

            execSync(speechCommand + " '" + message.substring(ttsCommand.length).trim() + "'");

        } else if (!modsOnly || user.username.toLowerCase() === channelName.toLowerCase().trim()) {

            execSync(speechCommand + " '" + message.substring(ttsCommand.length).trim() + "'");

        }

    }

});