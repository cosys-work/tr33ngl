#!/bin/bash
HERE=$(pwd)
LAST=${HERE##*/}
if [ "$LAST" != "scripts" ]; then
  source "./scripts/env.sh"
else
  source "./env.sh"
fi

echo "Set up $ROCKS"
safe_stop_remove "$ROCKS"
docker run --name "$ROCKS" -d -v "$(pwd)/db/:/typedb-all-linux/server/db/" -p "$ROCKS_PORT":1729 vaticle/typedb:"$ROCKS_VRSN"
