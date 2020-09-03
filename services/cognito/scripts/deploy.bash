#!/bin/bash

# set bash to stop if error happen
set -e

profile="nadtakan"
service="cognito"
stage=$1
region="us-east-1"

sls deploy --stage $stage --profile $profile

# Grab export (good for handling multiple stacks)
COGNITO_USER_POOL_ID=$(aws cloudformation list-exports --query "Exports[?Name==\`$service:$stage:UserPoolId\`].Value" --no-paginate --output text --region $region --profile $profile)

# create ssm keys cognito and web id
aws ssm --profile $profile --region $region put-parameter \
    --name "$service-$region-user-pool-id" \
    --type "String" \
    --value "${COGNITO_USER_POOL_ID}" \
    --overwrite 
	
