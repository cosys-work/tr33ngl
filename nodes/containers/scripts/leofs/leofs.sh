#!/usr/bin/bash
# For Debian/Ubuntu based distros that use apt
VRSN="latest";
NAME="leofs":$VRSN;

echo "Initiating LEOFS installation sequence...";

docker build -t $NAME .
safe_stop_remove "$NAME"
docker run -d \
  --net "$KEY_NET" \
  -v pVol:"$(pwd)/scripts/leofs/rwVol" \
  $NAME

echo "...finished LEOFS installation sequence.";
