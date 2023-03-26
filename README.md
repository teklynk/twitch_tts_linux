# twitch_tts_linux
Uses node, espeak and tmi.js to speak a chat message with: !tts hello, this is my message


Requires node.js

Tested on Linux Mint with spd-say and espeak.


# Setup Instructions:

Open index.js and set 
```javascript
// Settings
const processName = 'espeak';
const speechCommand = 'espeak -p 30 -s 100 -v en-french+15';
const modsOnly = false;
const channelName = 'yourtwitchchannel';
const ttsCommand = '!tts';
```
npm install

Start the script with npm run start OR node index.js
