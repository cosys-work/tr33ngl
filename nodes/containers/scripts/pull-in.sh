#!/bin/bash
HERE=$(pwd)
LAST=${HERE##*/}
if [ "$LAST" != "scripts" ]; then
  source "./scripts/env.sh"
else
  source "./env.sh"
fi

echo "#0 Get core base's required images nginx-alpine and bitnami-couchdb"
# 1. [Decorated] For Angular Federated Modules, usually with Svelte/Plain TypeScript/Rescript
docker pull nginx:"$NGINX_NGX_VRSN"
# 2. For UI component driven UIX-API, guaranteed to be the way the UI needs the API responses to be
docker pull bitnami/couchdb:"$COUCHDB_VRSN"
# Get opt-core base
# 3. [Linked 0] For Relational, Time series and GIS datasets
docker pull timescale/timescaledb-postgis:"$TIMESCALE_POSTGIS_VRSN"
# 4. [Linked 0] For OIDC/JWT and complex user roles, authorizations etc
docker pull bitnami/keycloak:"$KEYCLOAK_VRSN"
# 5. [Decorated, Linked 0] Mini-deb for prox-e-g APIs (Ledgers, Dashboards, MACERs)
docker pull bitnami/nginx:"$PROX_EG_NGINX_VRSN"
# 6. [Linked 0] For knowledge relations
docker pull vaticle/typedb:"$ROCKS_VRSN"
# 7. [Linked 0] For relational queries
docker pull metabase/metabase:"$MBASE_VRSN"

# Dev Env
docker pull sonarqube:"$SONARQUBE_VRSN"
docker pull sonarsource/sonar-scanner-cli:"$SONAR_SCANNER_VRSN"
