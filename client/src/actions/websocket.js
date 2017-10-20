import {WS_CLOSED, WS_CONNECTED, WS_MESSAGE} from "../util/constants";

export const webSocketConnected = () => ({ type : WS_CONNECTED });
export const webSocketClosed = () => ({ type : WS_CLOSED });
export const webSocketMessage = (message) => ({ type : WS_MESSAGE, payload : message });
