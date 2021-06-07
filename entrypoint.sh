#!/bin/sh -l

token=$1
url=$2
method=$3
arg=$4

[[ $url =~ ^'https://api.github.com/' ]] || exit 1

curl \
  -X $method \
  -H "Authorization: token $token" \
  -H "Accept: application/vnd.github.v3+json" \
  $url \
  -d $arg
