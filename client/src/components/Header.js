import * as React from "react";
import ConnectionIndicator from "./ConnectionIndicator";

class Header extends React.Component {

  render() {
    return (
        <div className="navbar navbar-inverse">
          <div className="container">
            <a className="navbar-brand" href="/">
              Swarm Visualizer
            </a>

            <div className="navbar-text navbar-right">
              <ConnectionIndicator />
            </div>
          </div>
        </div>
    );
  }

}

export default Header;
