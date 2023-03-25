#!/bin/bash

filename="$1"

# clear tts.txt file
truncate -s 0 "$filename"

# Checks if md5sum of the file has changed. Much better than using modified date.
while true
do

  m1=$(md5sum "$filename")

  m2=$(md5sum "$filename")

  if [ "$m1" != "$m2" ] ; then

    # read contents of tts.txt
    textValue=`cat tts.txt`

    # use spd-say/speech-dispatch to say the message from the tts.txt file
    spd-say --voice-type male2 --pitch -10 --rate -40 --punctuation-mode some --wait "$textValue"

    # clear tts.txt file
    truncate -s 0 "$filename"

    # cool down time
    sleep 10

  fi

done

# You may need to manually kill this process/script with: 
# pkill -9 -f ttsService.sh