$ErrorActionPreference = 'Stop';
$files = ""
Write-Host Starting build

Write-Host Updating base images

docker build -t mikesir87/swarm-viz --build-arg node=stefanscherer/node-windows:1709 --build-arg target=stefanscherer/node-windows:1709 .
docker images
