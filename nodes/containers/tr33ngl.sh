#!/bin/bash

source "./scripts/env.sh"

echo "#1.1. Containerize and start nginx-ngx dist server: $NGX_FED_MODS"
safe_stop_remove "$NGX_FED_MODS"
docker build -t "$NGX_FED_MODS":"$TR33NGLX_VRSN" -f Ngingx.Dockerfile .
docker run -d --name "$NGX_FED_MODS" -p "$TR33NGLX_PORT":80 "$NGX_FED_MODS":"$TR33NGLX_VRSN"

echo "#A The $NGX_FED_MODS container has been built and started."
