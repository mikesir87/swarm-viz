import {combineReducers} from "redux";
import swarmState from "./swarmState";
import webSocket from "./webSocket";
import taskDetailsModal from "./taskDetailsModal";

export default combineReducers({
  swarmState,
  webSocket,
  taskDetailsModal,
});
