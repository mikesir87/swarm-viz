import {APP_INIT} from "../util/constants";
import {ApiClient} from "../util/apiClient";
import {setNodes} from "../actions/setNodes";
import {setTasks} from "../actions/setTasks";
import {setServices} from "../actions/setServices";
import ReconnectingWebSocket from "../util/ReconnectingWebSocket";

export const appInitialization = ({ getState, dispatch }) => next => action => {
  if (action.type !== APP_INIT)
    return next(action);

  ApiClient.get("/nodes")
      .then((nodes) => dispatch(setNodes(nodes)));
  ApiClient.get("/services")
      .then((services) => dispatch(setServices(services)));
  ApiClient.get("/tasks")
      .then((tasks) => dispatch(setTasks(tasks)));

  // Connect WebSocket
  (new ReconnectingWebSocket(dispatch)).connect();

  next(action);
};
