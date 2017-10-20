import {SET_NODES, SET_SERVICES, SET_TASKS, WS_MESSAGE} from "../util/constants";

const DEFAULT_STATE = {
  nodes : [],
  services : [],
  tasks : [],
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_NODES:
      return Object.assign({}, state, { nodes : action.payload });
    case SET_SERVICES:
      return Object.assign({}, state, { services : action.payload });
    case SET_TASKS:
      return Object.assign({}, state, { tasks : action.payload });
    case WS_MESSAGE:
      if (action.payload.type === "task.update")
        return Object.assign({}, state, { tasks : action.payload.payload });
      return Object.assign({}, state);
    default:
      return state;
  }
};
