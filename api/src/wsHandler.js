import Docker from "dockerode";
const crypto = require("crypto");
const dockerAgent = new Docker();

export function createWsHandler(wsApp) {
  dockerAgent.getEvents({
    filters : {
      type : [ "node", "service" ]
    }
  }).then((stream) => {
    stream.on("data", (chunk) => {
      const data = chunk.toString("utf8");
      wsApp.getWss().clients.forEach((client) => {
        client.send(data);
      });
    });
  });

  let lastTaskHash = "";
  async function pollTasks() {
    const tasks = await dockerAgent.listTasks();
    let taskHash = crypto.createHash("md5").update(JSON.stringify(tasks)).digest("hex");
    if (taskHash === lastTaskHash)
      return;
    lastTaskHash = taskHash;

    const message = JSON.stringify({ type : "task.update", payload : tasks });
    wsApp.getWss().clients.forEach((client) => {
      client.send(message);
    });
  }

  setInterval(pollTasks, 500);

  return (ws, req) => {
   console.log("New WebSocket connection");
  }
}
