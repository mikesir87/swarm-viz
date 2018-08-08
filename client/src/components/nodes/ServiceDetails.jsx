import * as React from "react";
import {connect} from "react-redux";
import FormRow from "./FormRow";

class ServiceDetails extends React.Component {
  render() {
    const { service } = this.props;
    return (
        <div>
          <FormRow label="Service ID">
            { service.ID }
          </FormRow>
          <FormRow label="Name">
            { service.Spec.Name }
          </FormRow>
          <FormRow label="Replicas">
            { service.Spec.Mode.Replicated && (
              service.Spec.Mode.Replicated.Replicas
            )}
            { service.Spec.Mode.Global && (
              "Global"
            )}
          </FormRow>
          { service.Spec.EndpointSpec.Ports && (
            <FormRow label="Ports">
              { service.Spec.EndpointSpec.Ports.map((port) => (
                  <div key={port.PublishedPort}>{port.Protocol}{port.PublishedPort}/{port.TargetPort}</div>
              ))}
            </FormRow>
          )}
          <FormRow label="Labels">
            { Object.keys(service.Spec.Labels).length === 0 && (
                <span><em>No labels</em></span>
            )}
            { Object.keys(service.Spec.Labels).map((key) => (
              <div key={key}><strong>{key}:</strong> { service.Spec.Labels[key] }</div>
            ))}
          </FormRow>
        </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  service : state.swarmState.services.find((service) => service.ID === props.serviceId)
});

export default connect(mapStateToProps)(ServiceDetails);
