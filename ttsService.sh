#!/bin/bash

filename="$1"

# clear tts.txt file on start
truncate -s 0 "$filename"

m1=$(md5sum "$filename")

# Checks if md5sum of the file has changed. Much better than using modified date.
while true
do

  m2=$(md5sum "$filename")

  if [ "$m1" != "$m2" ] ; then

    # read contents of tts.txt
    textValue=`cat "$filename"`

    # Option 1
    # apt install speech-dispatcher
    spd-say --voice-type male2 --pitch -10 --rate -50 --punctuation-mode some --wait "$textValue"

    # Option 2
    # apt install gnustep-gui-runtime
    #say -f "$filename"

    # Option 3
    # apt install espeak
    #espeak -p 30 -s 100 -v en-french+15 "$textValue"

    # clear tts.txt file after reading the text
    truncate -s 0 "$filename"

    # wait before reading the next tts message
    sleep 3

  fi

done