#!/bin/bash

OLD="$(docker ps --all --quiet --filter=name="$1")"
if [ -n "$OLD" ]; then
  echo "Removing existing container: $1 ..."
  docker stop "$OLD" && docker rm "$OLD"
fi
