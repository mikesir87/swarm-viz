import {SET_NODES} from "../util/constants";

export const setNodes = (nodes) => ({
  type : SET_NODES,
  payload : nodes,
});
