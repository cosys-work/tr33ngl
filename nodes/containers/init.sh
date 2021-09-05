#!/bin/bash

source "scripts/env.sh"
# To enable pulling images before running use
# echo "#0. Get opt core's required images..."
# bash "scripts/pull-in.sh"

echo "#1. Building and starting core base..."
# shellcheck source=scripts/env.sh
source "$NGX_FED_MODS.sh"

echo "#2. Set up couch-pot-ato server..."
# shellcheck source=scripts/env.sh
source "scripts/$COUCH_ERL.sh"

echo "#3 Building and starting opt core..."
echo "#3.1"
# shellcheck source=scripts/env.sh
source "scripts/$PG_SPACE_TIME.sh"

echo "#3.2"
# shellcheck source=scripts/env.sh
source "scripts/$ROCKS.sh"

echo "#3.3"
# shellcheck source=scripts/env.sh
source "scripts/$KEY_CLOAK.sh"

echo "#3.4"
# shellcheck source=scripts/env.sh
source "scripts/$MBASE.sh"
