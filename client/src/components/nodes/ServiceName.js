import * as React from "react";
import {connect} from "react-redux";

class ServiceName extends React.Component {
  render() {
    return <span>{ this.props.name }</span>;
  }
}

const mapStateToProps = (state, props) => {
    const service = state.swarmState.services.find(s => s.ID === props.id);
    return (service === undefined) ? { name : "[Unknown]" } : { name : service.Spec.Name };
};

export default connect(mapStateToProps)(ServiceName);
