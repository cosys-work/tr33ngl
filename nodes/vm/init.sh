#!/bin/bash

if test -z "$BASH_VERSION"; then
  echo "Please run this script using bash, not sh or any other shell." >&2
  exit 1
fi

# Uses a custom Vagrantfile, please do not init a new one here
vagrant up
