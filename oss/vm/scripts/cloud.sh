#!/bin/bash

NAME="cloud";
PORT=8980;
VRSN="stable";
NXCD=nextcloud:$VRSN;

echo "Initiating NEXTCLOUD installation sequence...";
echo "Some: $DB_USER, $DB_PASS, $PG_NAME"
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
 -v nextcloud:/var/www/html \
 -v apps:/var/www/html/custom_apps \
 -v config:/var/www/html/config \
 -v data:/var/www/html/data \
 -e NEXTCLOUD_DATA_DIR="$(pwd)/datadir" \
 --mount type=bind,source="$(pwd)/datadir",target=/data \
  $NXCD

echo "...finished NEXTCLOUD installation sequence.";
