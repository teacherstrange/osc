function create-branch-connection-string {
    local DB_NAME=$1
    local BRANCH_NAME=$2
    local ORG_NAME=$3
    local CREDS=${4,,}-cicd-$(uuidgen)
    local secretshare=$5

    # delete password if it already existed
    # first, list password if it exists
    local raw_output=`pscale password list "$DB_NAME" "$BRANCH_NAME" --org "$ORG_NAME" --format json `
    # check return code, if not 0 then error
    if [ $? -ne 0 ]; then
        echo "Error: pscale password list returned non-zero exit code $?: $raw_output"
        exit 1
    fi

    local output=`echo $raw_output | jq -r "[.[] | select(.display_name == \"$CREDS\") ] | .[0].id "`
    # if output is not "null", then password exists, delete it
    if [ "$output" != "null" ]; then
        echo "Deleting existing password $output"
        pscale password delete --force "$DB_NAME" "$BRANCH_NAME" "$output" --org "$ORG_NAME"
        # check return code, if not 0 then error
        if [ $? -ne 0 ]; then
            echo "Error: pscale password delete returned non-zero exit code $?"
            exit 1
        fi
    fi
    
    local raw_output=`pscale password create "$DB_NAME" "$BRANCH_NAME" "$CREDS" --org "$ORG_NAME" --format json`
    
    if [ $? -ne 0 ]; then
        echo "Failed to create credentials for database $DB_NAME branch $BRANCH_NAME: $raw_output"
        exit 1
    fi

    local DB_URL=`echo "$raw_output" |  jq -r ". | \"mysql://\" + .id +  \":\" + .plain_text +  \"@\" + .database_branch.access_host_url + \"/\""`
    local GENERAL_CONNECTION_STRING=`echo "$raw_output" |  jq -r ". | .connection_strings.general"`

read -r -d '' SECRET_TEXT <<EOF
DATABASE_URL: $DB_URL
$GENERAL_CONNECTION_STRING
EOF

    # if not running in CI
    if [ -z "$CI" ]; then
        echo "In the next lines, you will see your secret, branch connection information: " 
        echo "$SECRET_TEXT"
    elif [ -n "$secretshare" ]; then
        # store the DB URL in secret store
        echo "::notice ::Please follow the link in the next line and click on 'Read the Secret!' to see the secret, branch specific connection string for various frameworks."
        local link=`curl -s -X POST -d "plain&secret=$SECRET_TEXT" https://shared-secrets-planetscale.herokuapp.com/`
        echo "$link"
        echo "::set-output name=CONNECTION_STRING_LINK::${link}"
        export MY_DB_URL_MAIN=$DB_URL
        echo "MY_DB_URL_MAIN=$DB_URL" >> $GITHUB_ENV
    fi
    echo
    echo "Alternatively, you can connect to your new branch like this:"
    echo "pscale shell \"$DB_NAME\" \"$BRANCH_NAME\" --org \"$ORG_NAME\""
    echo "or, to create a local tunnel to the database:"
    echo "pscale connect \"$DB_NAME\" \"$BRANCH_NAME\" --org \"$ORG_NAME\""
    export MY_DB_URL_MAIN=$DB_URL
    echo "MY_DB_URL_MAIN=$DB_URL" >> $GITHUB_ENV
}

. .pscale/cli-helper-scripts/use-pscale-docker-image.sh
. .pscale/cli-helper-scripts/wait-for-branch-readiness.sh

. .pscale/cli-helper-scripts/authenticate-ps.sh

create-branch-connection-string "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "${BRANCH_NAME}" 
    # if $2 and $3 are set, generate secret output links
    if [ -n "$2" ] && [ -n "$3" ]; then
        for i in `seq 1 $2`; do
            for j in `seq 1 $3`; do
                echo "::set-output name=dbconnection_${i}_${j}::`curl -s -X POST -d "plain&secret=$MY_DB_URL_MAIN" https://shared-secrets-planetscale.herokuapp.com/`"          
            done
        done
    fi