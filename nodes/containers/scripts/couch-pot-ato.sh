#!/bin/bash
HERE=$(pwd)
LAST=${HERE##*/}
if [ "$LAST" != "scripts" ]; then
  source "./scripts/env.sh"
else
  source "./env.sh"
fi

safe_stop_remove "$COUCH_ERL"
docker run -d --name "$COUCH_ERL" \
  -p "$COUCHDB_PORT":5984 \
  -e COUCHDB_PASSWORD=password \
  -v couchdb:/bitnami/couchdb \
  bitnami/couchdb:"$COUCHDB_VRSN"
echo "#B The $COUCH_ERL container has been started."
# COUCHDB_USER: The username of the administrator user when authentication is enabled. Default: admin
# COUCHDB_PASSWORD: The password to use for login with the admin user set in the COUCHDB_USER environment variable. Default: couchdb
# COUCHDB_NODENAME: A server alias for clustering support. Default: couchdb@127.0.0.1"
# COUCHDB_PORT_NUMBER: Standard port for all HTTP API requests. Default: 5984
# COUCHDB_CLUSTER_PORT_NUMBER: Port for cluster communication. Default: 9100
# COUCHDB_BIND_ADDRESS: Address binding for the standard port. Default: 0.0.0.0
