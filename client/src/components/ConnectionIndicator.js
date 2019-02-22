import * as React from "react";
import {connect} from "react-redux";

class ConnectionIndicator extends React.Component {
  render() {
    const { connected } = this.props;

    return (connected) ?
        (<div><i className="fa fa-check text-super-success" />&nbsp;Receiving events</div>) :
        (<div><i className="fa fa-times text-danger" />&nbsp;Not connected...</div>);
  }
}

const mapStateToProps = (state) => ({
  connected : state.webSocket.connected
});

export default connect(mapStateToProps)(ConnectionIndicator);
