#!/bin/sh

set -ex

SELF_DIR=$( (cd $(dirname $0); pwd) )
REPO_DIR=$( (cd "${SELF_DIR}/.."; pwd) )

main() {
  check_requirements
  push_amplify_with_yarn
}

check_requirements() {
  if ! command -v jq > /dev/null 2>&1; then
    echo 'Please install jq command.'
    return 1
  fi
  if ! command -v docker > /dev/null 2>&1; then
    echo 'Please install docker.'
    return 1
  fi
}

push_amplify_with_yarn() {
  cd "${REPO_DIR}"
  yarn install --frozen-lockfile && yarn build
  rm -rf node_modules

  cp package.json package.json.orig
  cp yarn.lock yarn.lock.orig
  cat package.json.orig | jq 'del(.devDependencies)' > package.json
  docker run \
    --rm \
    -v "$PWD":/var/task lambci/lambda:build-nodejs12.x sh \
    -c "npm install || true" \
    # -c "
    #   {
    #     yum install -y wget
    #     wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo
    #     curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
    #     yum install -y yarn
    #   } > /dev/null
    #   yarn install
    # " \
    # || true
  sudo chown -R $(id -u):$(id -g) node_modules
  du -hs node_modules
  echo | amplify push 2>&1 | tee -a amplify-push.log
  rm -rf package-lock.json node_modules

  mv package.json.orig package.json
  mv yarn.lock.orig yarn.lock
  yarn install --frozen-lockfile
  cd -
}

main "$@"
