#!/bin/bash
HERE=$(pwd)
LAST=${HERE##*/}
if [ "$LAST" == "dev" ]; then
  source "../env.sh"
else
  source "./scripts/env.sh"
fi

PORTAINER="portainer"
smart_stop_remove "$PORTAINER"
if [ "$( docker container inspect -f '{{.State.Running}}' "$PORTAINER" )" != "true" ]; then
  docker volume create portainer_data || true
  docker run -d \
    -p "$PORTAINER_API_PORT":8000 \
    -p "$PORTAINER_PORT":9000 \
    --name="$PORTAINER" \
    --restart=always \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v portainer_data:/data \
    portainer/portainer-ce:"$PORTAINER_VRSN"
fi
