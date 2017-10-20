$ErrorActionPreference = 'Stop';

Write-Host Starting deploy
docker login -u="$env:DOCKER_USER" -p="$env:DOCKER_PASS"

docker tag mikesir87/swarm-viz mikesir87/swarm-viz:windows-amd64-$env:APPVEYOR_REPO_COMMIT
docker push mikesir87/swarm-viz:windows-amd64-$env:APPVEYOR_REPO_COMMIT