# Prerequisites

Please ensure that you have git, docker, docker-compose, vagrant, and virtualbox installed and configured for use without require sudo or other special privileges.

# Multi-stage builds with multiple layers

We will be building the application in four stages.

- Creating and containerizing the angular production assets.

- Creating and containerizing the couchdb production configs.

- Creating a Debian 10 based nest middleware with clouds and grains.

- Bridging these using https, nginx and - optionally prox-e or prox-g.

# A Vagrant Pod

Docker with Vagrant involves 4 different components in addition to Vagrant itself:

1. The Docker provider for Vagrant
2. Some sort of Linux instance on which to run the Docker daemon
3. A virtualization platform, such as VirtualBox, VMware Fusion, or VMware Workstation
4. The appropriate Vagrant provider for your virtualization platform

from: [Scott Lowe's blog post](https://blog.scottlowe.org/2015/02/10/using-docker-with-vagrant/)

