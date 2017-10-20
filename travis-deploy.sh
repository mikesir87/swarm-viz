#!/bin/bash
set -e

image="mikesir87/swarm-viz"
docker tag $image "$image:linux-$ARCH"
docker push "$image:linux-$ARCH"

deploy() {
    sleep 15

    echo "Pushing manifest $image:latest"
    ./manifest-tool push from-args \
        --platforms linux/amd64,linux/s390x \
        --template "$image:OS-ARCH" \
        --target "$image:latest"
}

# https://github.com/travis-ci/travis-build/blob/master/lib/travis/build/templates/header.sh
travis_retry() {
  local result=0
  local count=1
  while [ $count -le 3 ]; do
    [ $result -ne 0 ] && {
      echo -e "\n${ANSI_RED}The command \"$@\" failed. Retrying, $count of 3.${ANSI_RESET}\n" >&2
    }
    # ! { } ignores set -e, see https://stackoverflow.com/a/4073372
    ! { "$@"; result=$?; }
    [ $result -eq 0 ] && break
    count=$(($count + 1))
    sleep 1
  done

  [ $count -gt 3 ] && {
    echo -e "\n${ANSI_RED}The command \"$@\" failed 3 times.${ANSI_RESET}\n" >&2
  }

  return $result
}

if [ "$ARCH" == "amd64" ]; then
  set +e
  echo "Waiting for other images $image:linux-s390"
  until docker run --rm stefanscherer/winspector "$image:linux-s390x"
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
  ./manifest-tool --version

  echo "Pushing manifest $image:$TRAVIS_TAG"
  travis_retry deploy
fi