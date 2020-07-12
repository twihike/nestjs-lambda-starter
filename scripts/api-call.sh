#!/bin/sh

URL=localhost:3000

list() {
  curl "${URL}/api/users" \
    -X GET \
    -H "Content-Type: application/json" \
    | jq .
}

post() {
  curl "${URL}/api/users" \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{ "name": "a1234567", "email": "a@a.com", "password": "aaaaaaaa" }' \
    | jq .
}

get() {
  curl "${URL}/api/users/a1234567" \
    -X GET \
    -H "Content-Type: application/json" \
    | jq .
}

put() {
  curl "${URL}/api/users/a1234567" \
    -X PUT \
    -H "Content-Type: application/json" \
    -d '{ "name": "a1234567", "email": "b@a.com", "password": "aaaaaaaa", "version": 1 }' \
    | jq .
}

delete() {
  curl "${URL}/api/users/a1234567" \
    -X DELETE \
    -H "Content-Type: application/json" \
    | jq .
}

"$@"
