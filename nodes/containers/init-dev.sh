#!/bin/bash
source "scripts/env.sh"

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
    -v portainer_data:/data portainer/portainer-ce:"$PORTAINER_VRSN"
fi

SONARQUBE="sonarqube"
smart_stop_remove "$SONARQUBE"
if [ "$( docker container inspect "$SONARQUBE" 2> /dev/null )" == "[]" ]; then
  safe_stop_remove "$SONARQUBE"
  docker run -d --name "$SONARQUBE" \
    --ulimit nofile=362144:362144 \
    --net "$KEY_NET" \
    -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true \
    -e SONARQUBE_JDBC_USERNAME=pgst \
    -e SONARQUBE_JDBC_PASSWORD=password \
    -e SONARQUBE_JDBC_URL=jdbc:postgresql://"$PG_SPACE_TIME":5432/pgst \
    -p "$SONARQUBE_PORT":9000 \
    -p "$SONARQUBE_API_PORT":9092 \
    "$SONARQUBE":"$SONARQUBE_VRSN"
fi

# docker run -d --name sonarqube --link sonar-postgres:pgsonar -p 9000:9000 -e SONARQUBE_JDBC_USERNAME=sonar -e SONARQUBE_JDBC_PASSWORD=secret -e SONARQUBE_JDBC_URL=jdbc:postgresql://pgsonar:5432/sonar sonarqube:5.1

echo "#E Dev Env containers initiated. Have a happy life, fellow dev."
