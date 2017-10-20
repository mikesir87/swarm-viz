# Swarm Visualizer

This project is serving as an updated version of the Swarm Visualizer found at https://github.com/dockersamples/docker-swarm-visualizer.

![Dashboard Screenshot](docs/screenshot1.png)

![Task Details Screenshot](docs/screenshot2.png)


## Why another one?

- It's event driven (well, sorta... tasks don't generate events yet, but we'll ignore that for now)
- Less clutter. Only the essential details are present, but more details are available with just a click
- Allows for more than three nodes. Have more nodes? It'll just keep adding another row!


## Running the visualizer

###

Running as container:

```
docker container run \
  --name swarm-viz \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  mikesir87/swarm-viz
```


## Development

From the root directory, simply run

```
docker-compose up -d
```

The backend (api) is found in the `/api` directory and the frontend is found in the `/client` directory.


