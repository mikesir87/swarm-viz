import reduxThunk from "redux-thunk";
import {applyMiddleware} from "redux";
import {appInitialization} from "./appInitialization";
import {updater} from "./updater";

export const middleware = applyMiddleware(
  reduxThunk,
  appInitialization,
  updater,
);
