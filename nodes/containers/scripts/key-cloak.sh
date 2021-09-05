#!/bin/bash

HERE=$(pwd)
LAST=${HERE##*/}
if [ "$LAST" != "scripts" ]; then
  source "./scripts/env.sh"
else
  source "./env.sh"
fi

echo "Set up $KEY_POT with $PG_SPACE_TIME"
safe_stop_remove "$KEY_POT"
docker run -d --name "$KEY_POT" \
  --net "$KEY_NET" \
  -p "$KEYCLOAK_PORT":8080 \
  -e DB_VENDOR="postgres" \
  -e KEYCLOAK_DATABASE_HOST="$PG_SPACE_TIME" \
  -e KEYCLOAK_DATABASE_NAME="$CLOAK_DB_NAME" \
  -e KEYCLOAK_DATABASE_USER="$CLOAK_DB_USER" \
  -e KEYCLOAK_DATABASE_PASSWORD="$CLOAK_DB_PASS" \
  -e KEYCLOAK_USER="$CLOAK_USER" \
  -e KEYCLOAK_PASSWORD="$CLOAK_PASS" \
  bitnami/keycloak:"$KEYCLOAK_VRSN"
echo "#D The $KEY_POT container has been started."
#  -e JDBC_PARAMS="connectTimeout=30000" \

# Creates administrator and manager user on boot.
# KEYCLOAK_CREATE_ADMIN_USER: Create administrator user on boot. Default: true.
# ADMIN_USER: Administrator default user. Default: user.
# ADMIN_PASSWORD: Administrator default password. Default: bitnami.
# MANAGEMENT_USER: WildFly default management user. Default: manager.
# MANAGEMENT_PASSWORD: WildFly default management password. Default: bitnami1.

# PGSQL Config
#  -e KEYCLOAK_DATABASE_HOST=postgresql \
#  -e KEYCLOAK_DATABASE_PORT=5432 \
# KEYCLOAK_DATABASE_SCHEMA: PostgreSQL database schema. Default: public.

# Keycloak UI Config
# KEYCLOAK_HTTP_PORT: Keycloak HTTP port. Default: 8080.
# KEYCLOAK_HTTPS_PORT: Keycloak HTTPS port. Default: 8443.
# KEYCLOAK_BIND_ADDRESS: Keycloak bind address. Default: 0.0.0.0.

# 5. Configure prox-e-g middleware with keycloak, couch and postgrest calls

