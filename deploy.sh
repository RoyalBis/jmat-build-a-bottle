#!/bin/bash

# Prompt for the profile name
echo "Enter AWS profile name:"
read profile_name

# Empty the S3 bucket
aws s3 rm s3://build-a-bottle.th8a.xyz --recursive --profile "$profile_name"

# Upload our project files to the S3 bucket
aws s3 cp dist/ s3://build-a-bottle.th8a.xyz --recursive --profile "$profile_name"

aws cloudfront create-invalidation --distribution-id E16USHGNAF55EA --paths "/*" --profile "$profile_name"