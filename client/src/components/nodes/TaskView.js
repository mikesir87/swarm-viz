import * as React from "react";
import {connect} from "react-redux";
import actions from "../../actions";
import TaskEntryDisplay from "./TaskEntryDisplay";
import {CSSTransitionGroup} from "react-transition-group";

class TaskView extends React.Component {
  render() {
    const { tasks } = this.props;
    const groupedTasks = [];

    let rowsNeeded = Math.ceil(tasks.length / 6);
    for (let i = 0; i < rowsNeeded; i++) {
      groupedTasks[i] = [];
      for (let j = 0; j < 6 && j + i*6 < tasks.length; j++) {
        groupedTasks[i][j] = tasks[i*6 + j];
      }
    }

    if (groupedTasks.length === 0)
      groupedTasks.push([]);

    return (
        <div className="task-list">
          <div className="row task-row">
            { this.renderTasks(tasks) }
          </div>
        </div>
    )
  }

  renderTasks = (tasks) => {
    if (tasks.length === 0) {
      return (<div className="col-sm-10">
        <div className="empty-text"><em>Shucks! It looks like there are no tasks for this node right now! Go and add some!</em></div>
      </div>);
    }
    return (
        <CSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={2000}
                            transitionLeaveTimeout={2000}>
          { tasks.map(this.renderTask) }
        </CSSTransitionGroup>
    );
  };

  renderTask = (task) => {
    const { displayTaskDetailsModal } = this.props;
    return (
      <TaskEntryDisplay onSelection={() => displayTaskDetailsModal(task.ID)}
                        key={ task.ID }
                        task={ task } />
    );
  };
}

const mapStateToProps = (state, props) => ({
  tasks : state.swarmState.tasks
            .filter((task) => task.DesiredState === "running")
            .filter((task) => task.NodeID === props.nodeId)
            .filter((task) => task.Spec.ContainerSpec !== undefined)
            .sort((a, b) => {
              if (a.Spec.ContainerSpec.Image !== b.Spec.ContainerSpec.Image)
                return (a.Spec.ContainerSpec.Image > b.Spec.ContainerSpec.Image) ? 1 : -1;
              return a.CreatedAt > b.CreatedAt ? 1 : -1;
            }),
});


export default connect(mapStateToProps, actions)(TaskView);
