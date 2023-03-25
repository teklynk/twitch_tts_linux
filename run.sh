#!/bin/bash

#Let the bash script catch SIGINT, and have it kill everything in the current process group

intexit() {
    # Kill all subprocesses (all processes in the current process group)
    kill -HUP -$$
}

hupexit() {
    echo
    echo "Interrupted"
    exit
}

trap hupexit HUP
trap intexit INT

# runs the spd-say bash script and starts the node tmi.js Twitch chat connection.
./ttsService.sh tts.txt & 
node index.js &

wait