#!/bin/bash

pkill -9 -f ttsService.sh

# runs the spd-say bash script and starts the node tmi.js Twitch chat connection.
./ttsService.sh tts.txt & node index.js