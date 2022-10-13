function create-db-branch {
    local DB_NAME=$1
    local BRANCH_NAME=$2
    local ORG_NAME=$3
    local recreate_branch=$4
    local FROM=$5

    # delete the branch if it already exists and recreate branch is set
    if [ -n "$recreate_branch" ]; then
        echo "Trying to delete branch $BRANCH_NAME if it already existed ..."
        pscale branch delete "$DB_NAME" "$BRANCH_NAME" --force --org "$ORG_NAME" 2>/dev/null    
    fi

    pscale branch create "$DB_NAME" "$BRANCH_NAME" --region us-east --org "$ORG_NAME" --from "$FROM"
    # if branch creation fails, exit with error
    if [ $? -ne 0 ]; then
        echo "Failed to create branch $BRANCH_NAME for database $DB_NAME"
        exit 1
    fi

    wait_for_branch_readiness 10 "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" 20
    if [ $? -ne 0 ]; then
        echo "Branch $BRANCH_NAME is not ready"
        exit 1
    fi

    local branch_url="https://app.planetscale.com/${ORG_NAME}/${DB_NAME}/${BRANCH_NAME}"
    echo "Branch $BRANCH_NAME is ready at $branch_url"
    # if CI variable ist set, then set output variables
    if [ -n "$CI" ]; then
        echo "::set-output name=BRANCH_URL::$branch_url"
    fi
}

function create-schema-change {
    local DB_NAME=$1
    local BRANCH_NAME=$2
    local ORG_NAME=$3
    local DDL_STATEMENTS=$4

    echo "Changing schema with the following DDL statements:"
    echo $DDL_STATEMENTS
    echo "$DDL_STATEMENTS" | pscale shell "$DB_NAME" "$BRANCH_NAME" --org "$ORG_NAME"
    if [ $? -ne 0 ]; then
        echo "Schema change in $BRANCH_NAME could not be created"
        exit 1
    fi
}


function create-deploy-request {
    local DB_NAME=$1
    local BRANCH_NAME=$2
    local ORG_NAME=$3
        
    raw_output=`pscale deploy-request create "$DB_NAME" "$BRANCH_NAME" --org "$ORG_NAME" --format json --deploy-to "main"` || true;

    if [ $? -ne 0 ]; then
        echo "Deploy request could not be created: $raw_output"
        exit 1
    fi
    local deploy_request_number=`echo $raw_output | jq -r '.number'`
    # if deploy request number is empty, then error
    if [ -z "$deploy_request_number" ]; then

        local deploy_request_error=`echo $raw_output | jq -r '.error'`
        if [ "$deploy_request_error" == "Database branch there is already an open deploy request for this branch" ]; then
            echo "Deploy request could not be created: $raw_output"
            exit 0
        fi

        echo "Could not retrieve deploy request number: $raw_output"
        exit 1
    fi

    local deploy_request="https://app.planetscale.com/${ORG_NAME}/${DB_NAME}/deploy-requests/${deploy_request_number}"
    echo "::set-output name=DEPLOY_REQUEST_NUMBER::$deploy_request_number"
    create-diff-for-ci "$DB_NAME" "$ORG_NAME" "$deploy_request_number" "$BRANCH_NAME"  
    export DEPLOY_REQUEST_NUMBER=$deploy_request_number
    echo "DEPLOY_REQUEST_NUMBER=$deploy_request_number" >> $GITHUB_ENV
}

function create-deploy-request-info {
    local DB_NAME=$1
    local ORG_NAME=$2
    local DEPLOY_REQUEST_NUMBER=$3

    local raw_output=`pscale deploy-request show "$DB_NAME" "$DEPLOY_REQUEST_NUMBER" --org "$ORG_NAME" --format json`
    if [ $? -ne 0 ]; then
        echo "Deploy request could not be retrieved: $raw_output"
        exit 1
    fi
    # extract the branch name from the deploy request
    local branch_name=`echo $raw_output | jq -r '.branch'`

    # check if the branch name is empty
    if [ -z "$branch_name" ]; then
        echo "Could not extract branch name from deploy request $DEPLOY_REQUEST_NUMBER"
        exit 1
    fi

    export BRANCH_NAME="$branch_name"
    local deploy_request="https://app.planetscale.com/${ORG_NAME}/${DB_NAME}/deploy-requests/${DEPLOY_REQUEST_NUMBER}"

    local branch_url="https://app.planetscale.com/${ORG_NAME}/${DB_NAME}/${BRANCH_NAME}"
    export BRANCH_URL="$branch_url"

    # if CI variable is set, export deployment request info
    if [ -n "$CI" ]; then
        echo "::set-output name=BRANCH_NAME::$branch_name"
        echo "::set-output name=DB_NAME::$DB_NAME"
        echo "::set-output name=ORG_NAME::$ORG_NAME"
        echo "::set-output name=DEPLOY_REQUEST_URL::$deploy_request"
        echo "::set-output name=DEPLOY_REQUEST_NUMBER::$DEPLOY_REQUEST_NUMBER"
        echo "::set-output name=BRANCH_URL::$branch_url"
    fi
}

function create-branch-info {
    local DB_NAME=$1
    local BRANCH_NAME=$2
    local ORG_NAME=$3

    local raw_output=`pscale branch show "$DB_NAME" "$BRANCH_NAME" --org "$ORG_NAME" --format json`
    if [ $? -ne 0 ]; then
        echo "Branch could not be retrieved: $raw_output"
        exit 1
    fi
    # extract the branch name from the deploy request
    local branch_name=`echo $raw_output | jq -r '.name'`

    # check if the branch name is empty
    if [ -z "$branch_name" ]; then
        echo "Could not extract existing branch name from branch $BRANCH_NAME"
        exit 1
    fi

    export BRANCH_NAME="$branch_name"
    
    local branch_url="https://app.planetscale.com/${ORG_NAME}/${DB_NAME}/${BRANCH_NAME}"
    export BRANCH_URL="$branch_url"

    # if CI variable is set, export branch info
    if [ -n "$CI" ]; then
        echo "::set-output name=BRANCH_NAME::$branch_name"
        echo "::set-output name=DB_NAME::$DB_NAME"
        echo "::set-output name=ORG_NAME::$ORG_NAME"
        echo "::set-output name=BRANCH_URL::$branch_url"
    fi
}

function create-diff-for-ci {
    local DB_NAME=$1
    local ORG_NAME=$2
    local deploy_request_number=$3 
    local BRANCH_NAME=$4
    local refresh_schema=$5

    local deploy_request="https://app.planetscale.com/${ORG_NAME}/${DB_NAME}/deploy-requests/${deploy_request_number}"
    local BRANCH_DIFF="Diff could not be generated for deploy request $deploy_request"

    # updating schema for branch
    if [ -n "$refresh_schema" ]; then
        pscale branch refresh-schema "$DB_NAME" "$BRANCH_NAME" --org "$ORG_NAME"
    fi  

    local lines=""
    # read shell output line by line and assign to variable
    while read -r line; do
        lines="$lines\n$line"
    done < <(pscale deploy-request diff "$DB_NAME" "$deploy_request_number" --org "$ORG_NAME" --format=json | jq .[].raw)

    
    if [ $? -ne 0 ]; then
        BRANCH_DIFF="$BRANCH_DIFF : ${lines}"
    else
        BRANCH_DIFF=$lines
    fi

    BRANCH_DIFF="${BRANCH_DIFF//'"'/''}"
    BRANCH_DIFF="${BRANCH_DIFF//'%'/'%25'}"
    BRANCH_DIFF="${BRANCH_DIFF//'\n'/'%0A'}"
    BRANCH_DIFF="${BRANCH_DIFF//'\r'/'%0D'}"
    # replace tabs with whitespace
    BRANCH_DIFF="${BRANCH_DIFF//'\t'/' '}"

    echo "::set-output name=BRANCH_DIFF::$BRANCH_DIFF"
    echo "$BRANCH_DIFF"
}

function wait_for_deploy_request_merged {
    local retries=$1
    local db=$2
    local number=$3
    local org=$4
    
    # check whether fifth parameter is set, otherwise use default value
    if [ -z "$5" ]; then
        local max_timeout=600
    else
        local max_timeout=$5
    fi

    local count=0
    local wait=1

    echo "Checking if deploy request $number is ready for use..."
    while true; do
        local raw_output=`pscale deploy-request list "$db" --org "$org" --format json`
        # check return code, if not 0 then error
        if [ $? -ne 0 ]; then
            echo "Error: pscale deploy-request list returned non-zero exit code $?: $raw_output"
            return 1
        fi
        local output=`echo $raw_output | jq ".[] | select(.number == $number) | .deployment.state"`
        echo "$output"
        # test whether output is pending, if so, increase wait timeout exponentially
        if [ "$output" = "\"submitting\"" ] || [ "$output" = "\"pending\"" ] || [ "$output" = "\"in_progress\"" ]; then
            # increase wait variable exponentially but only if it is less than max_timeout
            if [ $((wait * 2)) -le $max_timeout ]; then
                wait=$((wait * 2))
            else
                wait=$max_timeout
            fi  

            count=$((count+1))
            if [ $count -ge $retries ]; then
                echo  "Deploy request $number is not ready after $retries retries. Exiting..."
                return 2
            fi
            echo  "Deploy-request $number is not deployed yet."
            echo "Retrying in $wait seconds..."
            sleep $wait
        elif [ "$output" = "\"no_changes\"" ] || [ "$output" = "\"ready\"" ] || [ "$output" = "\"complete\"" ] || [ "$output" = "\"complete_pending_revert\"" ]; then
            if [ "$output" = "\"no_changes\"" ]; then
                pscale deploy-request close "$DB_NAME" "$DEPLOY_REQUEST_NUMBER" --org "$ORG_NAME"
                if [ $? -ne 0 ]; then
                    echo "Error: pscale deploy-request deploy returned non-zero exit code"
                    exit 1
                fi
            else
                pscale deploy-request deploy "$DB_NAME" "$DEPLOY_REQUEST_NUMBER" --org "$ORG_NAME"
                if [ $? -ne 0 ]; then
                    echo "Error: pscale deploy-request deploy returned non-zero exit code"
                    exit 1
                fi
            fi
            return 0
        elif [ "$output" = "\"error\"" ]; then
            echo "Error merging the deployment request, please check the Planetscale website for more information"
            echo "https://app.planetscale.com/${ORG_NAME}/${DB_NAME}/deploy-requests/${DEPLOY_REQUEST_NUMBER}"
            return 1
        else
            echo  "Deploy-request $number with unknown status: $output"
            return 3
        fi
    done
}

function create-deployment {
    local DB_NAME=$1
    local BRANCH_NAME=$2
    local DEPLOY_REQUEST_NUMBER=$3
    local ORG_NAME=$4
    local ci=true

    # local raw_output=`pscale deploy-request diff "$DB_NAME" "$DEPLOY_REQUEST_NUMBER" --format json --org "$ORG_NAME"`

    echo "Going to deploy deployment request $deploy_request with the following changes: "
    # jq -e '.. | select(type == "array" and length == 0)' "$raw_output"

    create-diff-for-ci "$DB_NAME" "$ORG_NAME" "$DEPLOY_REQUEST_NUMBER" "$BRANCH_NAME"

    # if array is empty

    wait_for_deploy_request_merged 9 "$DB_NAME" "$DEPLOY_REQUEST_NUMBER" "$ORG_NAME" 60
    if [ $? -ne 0 ]; then
        echo "Error: wait-for-deploy-request-merged returned non-zero exit code"
        echo "Check out the deploy request status at $deploy_request"
        exit 5
    else
        echo "Check out the deploy request at $deploy_request"
    fi
}
