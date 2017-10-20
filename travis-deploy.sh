#!/bin/bash
set -e

image="mikesir87/swarm-viz"
docker tag $image "$image:linux-$ARCH"
docker push "$image:linux-$ARCH"

deploy() {
    sleep 15
    ./manifest-tool push from-args \
        --platforms linux/amd64,linux/s390 \
        --template "$image:OS-ARCH" \
        --target "$image:manifest-tool"

    echo "Pushing manifest $image:latest"
    ./manifest-tool push from-args \
        --platforms linux/amd64,linux/s390 \
        --template "$image:OS-ARCH" \
        --target "$image:latest-manifest-tool"
}

if [ "$ARCH" == "amd64" ]; then
  set +e
  echo "Waiting for other images $image:linux-s390"
  until docker run --rm stefanscherer/winspector "$image:linux-s390"
  do
    sleep 15
    echo "Trying again..."
  done
#  echo "Waiting for other images $image:windows-amd64"
#  until docker run --rm stefanscherer/winspector "$image:windows-amd64"
#  do
#    sleep 15
#    echo "Trying again..."
#  done
  set -e

  echo "Downloading docker client with manifest command"
  wget https://5028-88013053-gh.circle-artifacts.com/1/work/build/docker-linux-amd64
  mv docker-linux-amd64 docker
  chmod +x docker
  ./docker version
  
  set -x
  
  echo "Downloading manifest-tool"
  wget https://github.com/estesp/manifest-tool/releases/download/v0.7.0/manifest-tool-linux-amd64
  mv manifest-tool-linux-amd64 manifest-tool
  chmod +x manifest-tool
  ./manifest-tool

  echo "Pushing manifest $image:$TRAVIS_TAG"
  travis_retry deploy()
fi