import express from "express";
import expressWs from "express-ws";
import {createWsHandler} from "./wsHandler";
import Docker from "dockerode";

const app = express();
const appWs = expressWs(app);
const dockerAgent = new Docker();

app.use(express.static("/app/build"));

app.ws("/api/events", createWsHandler(appWs));

app.get("/api/nodes", async (req, res) => {
  const nodes = await dockerAgent.listNodes();
  res.json(nodes);
});

app.get("/api/services", async (req, res) => {
  const services = await dockerAgent.listServices();
  res.json(services);
});

app.get("/api/tasks", async(req, res) => {
  const tasks = await dockerAgent.listTasks();
  res.json(tasks);
});

app.listen(3000, () => console.log("App listening on port 3000"));

//
// need this in docker container to properly exit since node doesn't handle 
// SIGINT/SIGTERM
// Note, a more graceful way would be first server.close(), wait X seconds for 
// connections to close (but websockets), then process.exit()
//

process
  .on('SIGTERM', shutdown('SIGTERM')) // docker stop
  .on('SIGINT', shutdown('SIGINT')) // ctrl-c in linux/mac
  .on('uncaughtException', shutdown('uncaughtException'));

// shut down server without waiting
function shutdown(signal) {
  return (err) => {
    console.log(`${ signal }...`);
    if (err) console.error(err.stack || err);
    setTimeout(() => {
      process.exit(err ? 1 : 0);
    }, 0).unref();
  };
}
