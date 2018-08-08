import * as React from "react";
import ImageName from "./ImageName";
import TaskInfoModal from "./TaskInfoModal";
import ServiceName from "./ServiceName";

class TaskEntryDisplay extends React.Component {

  render() {
    const { task, onSelection } = this.props;

    if (task.status.ContainerStatus === undefined)
      return null;

    const containerId = (task.Status.ContainerStatus.ContainerID) ?
        task.Status.ContainerStatus.ContainerID.substring(0, 8) : "";

    return (
        <div className="col-sm-2">
          <div className="task-entry" onClick={onSelection}>
            <div className="text-center">
              <ServiceName id={task.ServiceID} />
              <small className="text-muted"><ImageName imageSpec={ task.Spec.ContainerSpec.Image } /></small>
              <small className="text-muted">{ containerId }</small>
            </div>
          </div>
        </div>
    )
  }

}

export default TaskEntryDisplay;
