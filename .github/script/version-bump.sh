#!/usr/bin/env bash

set -o pipefail

git config user.email "$(git --no-pager log --format=format:'%ae' -n 1)"
git config user.name "$(git --no-pager log --format=format:'%an' -n 1)"

current_version=$(node -p "require('./package.json').version")
current_branch=$(git rev-parse --abbrev-ref HEAD)

if [[ ! "main master" =~ .*"$current_branch".* ]]; then
  echo "::error::Not on 'main' or 'master' branch.  Unable to version."
  exit 1
fi

if [[ -n $(git status -s) ]]; then
  echo "Working directory is dirty.  Exiting."
  exit 1
fi

git fetch --tags
if [[ ! "$(git tag -l)" =~ .*"$current_version".* ]]; then
  echo "Version already bumped in package.json"
  new_version=$current_version
else
  echo "Bumping version in package.json"
  npm version patch -m "bump version to %s [skip ci]"
  new_version=$(node -p "require('./package.json').version")
  git push origin --force
fi
git tag "v$new_version"
git push origin --force --tags

echo ::set-output name=TAG::$new_version
