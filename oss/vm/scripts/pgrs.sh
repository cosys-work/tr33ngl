#!/bin/bash

NAME="$PG_NAME";
PORT=5432;
VRSN="latest-pg12";
CTNR=timescale/timescaledb-postgis:$VRSN;

echo "Initiating POSTGRES_DB installation sequence...";

docker pull $CTNR;

safe_stop_remove "$NAME";

docker run -d --name "$NAME" \
  -p "$PORT":5432 \
  --net "$KEY_NET" \
  -e POSTGRES_USER="$DB_USER" \
  -e POSTGRES_DB="$DB_NAME" \
  -e POSTGRES_PASSWORD="$DB_PASS" \
  -e NO_TS_TUNE=true \
  -e TIMESCALEDB_TELEMETRY=off \
  -e PGDATA=/var/lib/postgresql/data/pgdata \
  -v db:/var/lib/postgresql/data \
  timescale/timescaledb-postgis:"$VRSN";

echo "...finished POSTGRES_DB installation sequence.";
