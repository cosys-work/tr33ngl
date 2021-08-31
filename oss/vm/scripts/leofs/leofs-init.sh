#!/bin/bash

# [Ubuntu 18.04](https://github.com/leo-project/leofs/releases/download/1.4.3/leofs_1.4.3-1_ubuntu-18.04_amd64.deb)
# [CentOS 7.0](https://github.com/leo-project/leofs/releases/download/1.4.3/leofs-1.4.3-1.el7.x86_64.rpm)

# Determine OS platform
if [ -f /etc/redhat-release ]; then
  wget https://github.com/leo-project/leofs/releases/download/1.4.3/leofs-1.4.3-1.el7.x86_64.rpm
  yum update
  rpm -Uvh leofs-1.4.3-1.el7.x86_64.rpm
elif [ -f /etc/lsb-release ]; then
  apt-get update
  dpkg -i leofs_1.4.3-1_ubuntu-18.04_amd64.deb
fi
