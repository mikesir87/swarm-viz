import * as React from "react";
import Modal from "react-bootstrap/es/Modal";
import Button from "react-bootstrap/es/Button";
import {connect} from "react-redux";
import FormRow from "./FormRow";
import ServiceDetails from "./ServiceDetails";
import actions from "../../actions";

class TaskInfoModal extends React.Component {
  render() {
    const { closeTaskDetailsModal, task } = this.props;
    return (
        <Modal bsSize="large"  show={ true } onHide={closeTaskDetailsModal}>
          <Modal.Header closeButton>
            <Modal.Title>Task Info - { task.ID }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal">
              <h3>Container Details</h3>
              <FormRow label="Container ID">
                { task.Status.ContainerStatus.ContainerID }
              </FormRow>
              <FormRow label="Image">
                { task.Spec.ContainerSpec.Image }
              </FormRow>
              <FormRow label="Created At">
                { task.CreatedAt }
              </FormRow>
              <FormRow label="Updated At">
                { task.UpdatedAt }
              </FormRow>

              <hr />
              <h3>Service Details</h3>
              <ServiceDetails serviceId={ task.ServiceID } />

            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeTaskDetailsModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    );
  }
}

const mapStateToProps = (state, props) => ({
  task : state.swarmState.tasks.filter((task) => task.ID === props.taskId)[0],
});

export default connect(mapStateToProps, actions)(TaskInfoModal);
