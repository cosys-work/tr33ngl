#!/bin/bash
HERE=$(pwd)
LAST=${HERE##*/}
if [ "$LAST" != "scripts" ]; then
  source "./scripts/env.sh"
else
  source "./env.sh"
fi

echo "Set up postgre-space-time"

#TODO use entrypoint script for creating separate databases for each vertical client

docker network create "$KEY_NET" 2> /dev/null
safe_stop_remove "$PG_SPACE_TIME"
docker run -d --name "$PG_SPACE_TIME" \
  -p "$POSTGRES_PORT":5432 \
  --net "$KEY_NET" \
  -e POSTGRES_USER="$DB_USER" \
  -e POSTGRES_DB="$DB_NAME,$CLOAK_DB_NAME,$MBASE_DB_NAME" \
  -e POSTGRES_PASSWORD="$DB_PASS" \
  -e NO_TS_TUNE=true \
  -e TIMESCALEDB_TELEMETRY=off \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v db:/var/lib/postgresql/data \
  timescale/timescaledb-postgis:"$TIMESCALE_POSTGIS_VRSN"

echo "#C The $PG_SPACE_TIME container has been started."
