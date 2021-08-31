#!/bin/bash

NAME="cloud";
PORT=8980;
VRSN="stable";
NXCD=nextcloud:$VRSN;

echo "Initiating NEXTCLOUD installation sequence...";

docker pull $NXCD
safe_stop_remove "$NAME"
docker run -d \
 --name "$NAME" \
 -p $PORT:80 \
 --net "$KEY_NET" \
 --link "$PG_NAME" \
 -e POSTGRES_USER="$DB_USER" \
 -e POSTGRES_DB="$DB_NAME" \
 -e POSTGRES_PASSWORD="$DB_PASS" \
 -e POSTGRES_HOST="$PG_NAME" \
 -e NEXTCLOUD_DATA_DIR="$(pwd)/leofs/pVol" \
 -v db:/var/lib/postgresql/data \
 -v pVol:"$(pwd)/leofs/pVol" \
 -v nextcloud:/leofs/pVol/nextcloud \
 -v apps:/leofs/pVol/custom_apps \
 -v config:/leofs/pVol/config \
 -v data:/leofs/pVol/data \
  $NXCD

echo "...finished NEXTCLOUD installation sequence.";
