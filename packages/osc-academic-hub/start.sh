# This file is how Fly starts the server (configured in fly.toml). Before starting
# the server though, we need to run any prisma migrations that haven't yet been
# run, which is why this file exists in the first place.
# Learn more: https://community.fly.io/t/sqlite-not-getting-setup-properly/4386

#!/bin/sh

set -ex
export PLANETSCALE_PRISMA_DATABASE_URL='mysql://0km8q7u4jdmk:pscale_pw_1Vs3DATSnjpCrMdSprJ8R8u1iQSKEMUXSXdRC-0nYd4@g0gbljs4ymlr.us-east-4.psdb.cloud/osc-academic-hub?sslaccept=strict&sslcert=./server-ca.pem'
export SHADOW_DATABASE_URL='mysql://yhz8t72trvkt:pscale_pw_z8GYVmz6NNVMgsMR3jD3nl2awTljYtS6T1c8pgSLhak@cj8579ssc3sr.eu-west-3.psdb.cloud/osc-academic-hub?sslaccept=strict&sslcert=./server-ca.pem'
export SERVICE_ENCRYPTION_IV="uf0k0dx55rp7u1sg"
export SERVICE_ENCRYPTION_KEY="jc7xh9d2lvw2uluo"
npx prisma migrate deploy
npm run start
