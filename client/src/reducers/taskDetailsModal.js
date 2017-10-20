import {CLOSE_TASK_DETAILS_MODAL, DISPLAY_TASK_DETAILS_MODAL} from "../util/constants";

const DEFAULT_STATE = {
  taskId : null,
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case DISPLAY_TASK_DETAILS_MODAL:
      return Object.assign({}, state, { taskId : action.payload.taskId });
    case CLOSE_TASK_DETAILS_MODAL:
      return Object.assign({}, state, { taskId : null });
    default:
      return state;
  }
};
