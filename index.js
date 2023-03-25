const tmi = require('tmi.js');
const fs = require('fs');
const ttsFile = './tts.txt';

const client = new tmi.Client({
	channels: ['teklynk']
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	if (message.startsWith("!tts ")) {
	    console.log(`${tags['display-name']}: ${message}`);
        message = message.substring(4);
        message = message.trim();
        fs.writeFileSync(ttsFile, message);
    }
});