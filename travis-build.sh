#!/bin/bash
set -e

docker version
uname -a
echo "Updating Docker engine to latest version"
sudo service docker stop
curl -fsSL https://get.docker.com/ | sudo sh
docker version

if [ "$ARCH" == "amd64" ]; then
  docker build -t mikesir87/swarm-viz .
fi

if [ "$ARCH" == "s390x" ]; then
  docker build -t mikesir87/swarm-viz --build-arg target=s390x/node:8.7 .
fi
