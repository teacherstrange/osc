#!/bin/bash

. .pscale/cli-helper-scripts/use-pscale-docker-image.sh

. .pscale/cli-helper-scripts/authenticate-ps.sh

BRANCH_NAME="$1"

pscale branch delete "$DB_NAME" "$BRANCH_NAME" --force --org "$ORG_NAME"