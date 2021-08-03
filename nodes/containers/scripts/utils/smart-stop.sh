#!/bin/bash

OLD_STATE="$( docker container inspect -f '{{.State.Status}}' "$1" 2> /dev/null )"
if [ "$OLD_STATE" != "running" ]; then
  echo "$1 container not running..."
  bash "safe_stop.sh" "$1"
fi
