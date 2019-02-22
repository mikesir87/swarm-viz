import * as React from "react";
import TaskView from "./TaskView";

class NodeEntryDisplay extends React.Component {
  render() {
    const { node } = this.props;

    const role = (node.ManagerStatus) ? `Manager ${node.ManagerStatus.Leader ? "(Leader)" : ""}` : "Worker";

    return (
        <div className="col-sm-12" key={ node.ID }>
          <div className="node-display">
            <div className="row">
              <div className="col-sm-2 node-metadata">
                <div className="node-name">{ node.Description.Hostname }</div>
                <div className="node-role">{ role }</div>
                <div className="node-arch">{ node.Description.Platform.Architecture } ({ node.Description.Platform.OS })</div>
                <div className="node-resources">
                  <small>
                    <i className={"fa fa-microchip"} /> { (node.Description.Resources.NanoCPUs / 1000000000).toFixed(1) }
                    &nbsp; &nbsp;
                    <i className={"fa fa-memory"} /> { (node.Description.Resources.MemoryBytes / 1000000000).toFixed(2) } GB
                  </small>
                </div>
              </div>
              <div className="col-sm-10">
                <TaskView nodeId={ node.ID } />
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default NodeEntryDisplay;
