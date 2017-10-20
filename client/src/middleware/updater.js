import {WS_MESSAGE} from "../util/constants";
import {ApiClient} from "../util/apiClient";
import {setNodes} from "../actions/setNodes";
import {setServices} from "../actions/setServices";

export const updater = ({ getState, dispatch }) => next => action => {
  if (action.type !== WS_MESSAGE)
    return next(action);

  switch (action.payload.Type) {
    case "service":
      ApiClient.get("/services").then((services) => dispatch(setServices(services)));
      break;
    case "node":
      ApiClient.get("/nodes").then((nodes) => dispatch(setNodes(nodes)));
      break;
    default:
  }

  next(action);
};
