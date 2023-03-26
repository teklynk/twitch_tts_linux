const tmi = require('tmi.js');
const { exec } = require('child_process');

// Settings
const processName = 'espeak';
const speechCommand = 'espeak -p 30 -s 100 -v en-french+15';
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

    if (user['message-type'] === 'chat' && message.startsWith(ttsCommand + ' ')) {
        isRunning(processName, (proc_status) => {
            // If speech process is not currently running
            if (!proc_status) {
                if (modsOnly && (user.mod || user.username.toLowerCase() === channelName.toLowerCase().trim())) {

                    exec(speechCommand + " '" + message.substring(ttsCommand.length).trim() + "'");

                } else if (!modsOnly || user.username.toLowerCase() === channelName.toLowerCase().trim()) {

                    exec(speechCommand + " '" + message.substring(ttsCommand.length).trim() + "'");

                }
            }
        })
    }

});

// checks process status
const isRunning = (query, cb) => {
    let cmd = `ps -A`;
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}