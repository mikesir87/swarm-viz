import {createStore, compose} from "redux";
import reducers from "../reducers";
import { middleware } from "../middleware";
import { appInit } from "../actions/appInit";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(middleware));
store.dispatch(appInit());

export default store;
