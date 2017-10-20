import {SET_TASKS} from "../util/constants";

export const setTasks = (tasks) => ({
  type : SET_TASKS,
  payload : tasks,
});
