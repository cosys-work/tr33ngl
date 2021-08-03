#!/bin/bash

# Utility to stop and remove if existing
safe_stop_remove() {
  OLD="$(docker ps --all --quiet --filter=name="$1")"https://www.primewire.li/
  if [ -n "$OLD" ]; then
    echo "Removing existing container: $1 ..."
    docker stop "$OLD" && docker rm "$OLD"
  fi
}


GITLAB_HOME=$(pwd)/gitlab
export GITLAB_HOME
safe_stop_remove gitlab
docker run --detach \
  --hostname gitlab.cosys.work \
  --publish 443:443 --publish 80:80 --publish 22:22 \
  --name gitlab \
  --restart always \
  --volume $GITLAB_HOME/config:/etc/gitlab \
  --volume $GITLAB_HOME/logs:/var/log/gitlab \
  --volume $GITLAB_HOME/data:/var/opt/gitlab \
  gitlab/gitlab-ce:latest
