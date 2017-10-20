import {DISPLAY_TASK_DETAILS_MODAL} from "../util/constants";

export const displayTaskDetailsModal = (taskId) => ({
  type : DISPLAY_TASK_DETAILS_MODAL,
  payload : { taskId },
});
