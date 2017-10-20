import {WS_CONNECTED, WS_CLOSED} from "../util/constants";

const DEFAULT_STATE = {
  connected : false,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case WS_CONNECTED:
      return Object.assign({}, state, { connected : true });
    case WS_CLOSED:
      return Object.assign({}, state, { connected : false });
    default:
      return state;
  }
};
