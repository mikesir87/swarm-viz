# Swarm Visualizer

This project is serving as an updated version of the Swarm Visualizer found at https://github.com/dockersamples/docker-swarm-visualizer.

![Dashboard Screenshot](docs/screenshot1.png)

![Task Details Screenshot](docs/screenshot2.png)


## Why another one?

- It's event driven (well, sorta... tasks don't generate events yet, but we'll ignore that for now)
- Less clutter. Only the essential details are present, but more details are available with just a click
- Allows for more than three nodes. Have more nodes? It'll just keep adding another row!


## Running the visualizer

### Linux/Mac

Running as container:

```
docker container run \
  --name swarm-viz \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  mikesir87/swarm-viz
```

### Windows Server 1709

Run as Windows container:

```
docker container run `
  --name swarm-viz `
  -p 3000:3000 `
  -u ContainerAdministrator `
  -v //./pipe/docker_engine://./pipe/docker_engine `
  mikesir87/swarm-viz
```

## Development

From the root directory, simply run

```
docker-compose up -d
```

The backend (api) is found in the `/api` directory and the frontend is found in the `/client` directory.

## Build

### Windows

At the moment there is no official node image for Windows. Therefore apply another base image to build the app.

```
docker build -t mikesir87/swarm-viz --build-arg node=stefanscherer/node-windows:1709 .
```

## Label Parsing

Swarm-viz will parse labels beginning with `swarm-viz.` and display them in an "Extra Info" section. It also supports templating.

### Link handling

A label starting with `swarm-viz.link.` will use any remaining text in the identifier as a label, and will turn the value of the label into a clickable link. (Example: `swarm-viz.link.foo:http://google.com` will create the entry `foo : http://google.com`.)

Templating is taken into account before link parsing, allowing for dynamic links.

### Templating

Input          |          Output
---------------|-----------------
${containerid} | The container's unique id string.
${imagename}   | The name of the image the container was made with. It is found by removing the extra info from the container name.
${stackname}   | The name of the stack the container is a part of. It is found from subtracting the image name from the service name.