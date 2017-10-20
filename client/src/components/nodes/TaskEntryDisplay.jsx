import * as React from "react";
import ImageName from "./ImageName";
import TaskInfoModal from "./TaskInfoModal";

class TaskEntryDisplay extends React.Component {

  render() {
    const { task, onSelection } = this.props;
    const containerId = (task.Status.ContainerStatus.ContainerID) ?
        task.Status.ContainerStatus.ContainerID.substring(0, 8) : "";

    return (
        <div className="col-sm-2">
          <div className="task-entry" onClick={onSelection}>
            <div className="text-center">
              <ImageName imageSpec={ task.Spec.ContainerSpec.Image } />
              <small className="text-muted">{ containerId }</small>
            </div>
          </div>
        </div>
    )
  }

}

export default TaskEntryDisplay;
