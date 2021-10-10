#!/bin/bash

export KEY_NET="key-net"
export KEY_VOL="key-vol"


export DB_USER="nextcloud";
export DB_NAME="nextcloud";
export DB_PASS="nextcloud";


if test -z "$BASH_VERSION"; then
  echo "Please run this script using bash, not sh or any other shell." >&2
  exit 1
fi

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

export PG_NAME="pgrs";

docker network create "$KEY_NET" 2> /dev/null
docker volume create "$KEY_VOL" 2> /dev/null

docker pull bitnami/minideb:jessie

export IS_ENV_SET_UP="Is env set up? Yup!"
set +a
