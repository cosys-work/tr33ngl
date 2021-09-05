#!/bin/bash

if [[ -n "${IS_ENV_SET_UP}" ]]; then
  return
else
  echo "Env not set. Configuring env first..."

  #A
  export TR33NGLX_PORT=80
  export TR33NGLX_VRSN="v1"
  export NGINX_NGX_VRSN="1.21-alpine"
  export PROX_EG_NGINX_VRSN="1.19"

  #B
  export COUCHDB_PORT=5984
  export COUCHDB_VRSN="3.1.1"

  #C
  export POSTGRES_PORT=5432
  export TIMESCALE_POSTGIS_VRSN="latest-pg12"

  #D
  export KEYCLOAK_PORT=8080
  export KEYCLOAK_VRSN="13"

  #E
  export ROCKS_PORT=1729
  export ROCKS_VRSN="latest"

  #F
  export MBASE_VRSN="latest"
  export MBASE_PORT=3000

  #Dev A
  export PORTAINER_PORT=9090
  export PORTAINER_API_PORT=8000
  export PORTAINER_VRSN="latest"

  #Dev B
  export SONARQUBE_PORT=9000
  export SONARQUBE_API_PORT=9092
  export SONARQUBE_VRSN="lts-community"

  #Names
  export NGX_FED_MODS="tr33ngl"
  export COUCH_ERL="couch-pot-ato"
  export KEY_NET="key-net"
  export PG_SPACE_TIME="pg-space-time"
  export ROCKS="rocks"
  export KEY_POT="key-pot"
  export KEY_CLOAK="key-cloak"
  export MBASE="metabase"

  #Creds
  export DB_USER="pgst"
  export DB_NAME="pgst"
  export DB_PASS="password"
  export DB_PORT="$POSTGRES_PORT"

  export CLOAK_DB_USER="$DB_USER"
  export CLOAK_DB_NAME="keycloak"
  export CLOAK_DB_PASS="password"
  export CLOAK_DB_PORT="$DB_PORT"

  export MBASE_DB_USER="$DB_USER"
  export MBASE_DB_NAME="metabase"
  export MBASE_DB_PASS="password"
  export MBASE_DB_PORT="$DB_PORT"

  export CLOAK_USER="admin"
  export CLOAK_PASS="password"

  set -a
  # Utility to stop and remove if existing
  safe_stop_remove() {
    OLD="$(docker ps --all --quiet --filter=name="$1")"
    if [ -n "$OLD" ]; then
      echo "Removing existing container: $1 ..."
      docker stop "$OLD" && docker rm "$OLD"
    fi
  }

  # Utility to remove containers in crash loop
  # or constantly restarting/unhealthy
  smart_stop_remove() {
    OLD_STATE="$( docker container inspect -f '{{.State.Status}}' "$1" 2> /dev/null )"
    if [ "$OLD_STATE" != "running" ]; then
      echo "$1 container not running..."
      safe_stop_remove "$1"
    fi
  }

  export -f safe_stop_remove
  export -f smart_stop_remove


  export IS_ENV_SET_UP="Is env set up? Yup!"
  set +a

fi
