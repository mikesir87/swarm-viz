import * as React from "react";
import {connect} from "react-redux";

class ConnectionStatus extends React.Component {

  render() {
    const { connected } = this.props;
    return (<p>HI</p>);
  }
}

const mapStateToProps = (state) => ({
  connected : state.webSocket.connected,
});

export default connect(mapStateToProps)(ConnectionStatus);
