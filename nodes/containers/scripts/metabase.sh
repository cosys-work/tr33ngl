#!/bin/bash
HERE=$(pwd)
LAST=${HERE##*/}
if [ "$LAST" != "scripts" ]; then
  source "./scripts/env.sh"
else
  source "./env.sh"
fi

safe_stop_remove "$MBASE"
docker run -d -p "$MBASE_PORT":3000 \
  --net "$KEY_NET" \
  -v db:/metabase-data \
  -e MB_DB_TYPE=postgres \
  -e MB_DB_DBNAME="$DB_NAME" \
  -e MB_DB_PORT="$CLOAK_DB_PORT" \
  -e MB_DB_USER="$CLOAK_DB_USER" \
  -e MB_DB_PASS="$CLOAK_DB_PASS" \
  -e MB_DB_HOST="$PG_SPACE_TIME" \
  -e MB_ENCRYPTION_SECRET_KEY=somerandomstuffofatleast16characters \
  --name "$MBASE" metabase/metabase:"$MBASE_VRSN"

echo "$MBASE UI started."
