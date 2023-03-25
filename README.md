# twitch_tts_linux
Uses spd-say and tmi.js to speak a chat message with !tts hello, this is my message


Requires node.js

Tested on Linux Mint with spd-say.


# Setup Instructions:

Open index.js and set 
```javascript
const client = new tmi.Client({
	channels: ['yourtwitchchannel']
});
```
npm install

Start the script with ./run.sh in the terminal.

You may need to manually kill this process/script with: 

pkill -9 -f ttsService.sh
