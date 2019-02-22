import React, { Component } from 'react';
import {Provider} from "react-redux";
import store from "../util/store";
import Header from "./Header";
import NodeView from "./nodes/NodeView";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Header />
          <NodeView />
        </div>
      </Provider>
    );
  }
}

export default App;
