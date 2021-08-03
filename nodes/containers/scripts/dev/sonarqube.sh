#!/bin/bash
HERE=$(pwd)
LAST=${HERE##*/}
if [ "$LAST" == "dev" ]; then
  source "../env.sh"
else
  source "./scripts/env.sh"
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
