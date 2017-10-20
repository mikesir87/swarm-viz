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
