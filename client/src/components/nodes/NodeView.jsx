import * as React from "react";
import {connect} from "react-redux";
import reducers from "../../reducers";
import NodeEntryDisplay from "./NodeEntryDisplay";
import TaskInfoModal from "./TaskInfoModal";

class NodeView extends React.Component {
  static renderNode(node) {
    return (
      <NodeEntryDisplay key={ node.ID } node={ node } />
    );
  }

  render() {
    const { nodes, modalTaskId } = this.props;
    const modal = (modalTaskId) ? (<TaskInfoModal onClose={this.closeTaskModal} taskId={modalTaskId} />) : "";

    if (nodes.length === 0)
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p>What?!? You have no nodes!</p>
              <p>Start up a Swarm by using the following command:</p>
              <pre>
                $ docker swarm init
              </pre>
            </div>
          </div>
        </div>
      );

    return (
        <div className="container-fluid">
          { nodes.map(NodeView.renderNode)}
          { modal }
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nodes : state.swarmState.nodes.sort((a, b) => {
    if (a.ManagerStatus && b.ManagerStatus) {
      if (a.ManagerStatus.Leader) return 1;
      if (b.ManagerStatus.Leader) return -1;
      return 0;
    }
    return (a.Description.Hostname > b.Description.Hostname) ? 1 : -1;
  }),
  modalTaskId : state.taskDetailsModal.taskId,
});

export default connect(mapStateToProps, reducers)(NodeView);
