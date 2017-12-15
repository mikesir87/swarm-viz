import WS from "reconnecting-websocket";
import {webSocketConnected, webSocketClosed, webSocketMessage} from "../actions/websocket";

class ReconnectingWebSocket {

  constructor(dispatch, url) {
    this.dispatch = dispatch;
    const protocol = (window.location.protocol === 'https:') ? "wss" : "ws";
    this.url = url || `${protocol}://${window.location.host}/api/events`;
  }

  connect() {
    this.socket = new WS(this.url);
    this.socket.addEventListener("open", this.onOpen.bind(this));
    this.socket.addEventListener("close", this.onClose.bind(this));
    this.socket.addEventListener("message", this.onMessage.bind(this));
  }

  onOpen() {
    this.dispatch(webSocketConnected());
    this.pingInterval = setInterval(() => this.socket.send("PING"), 15000);
  }

  onClose() {
    this.dispatch(webSocketClosed());
    clearInterval(this.pingInterval);
  }

  onMessage(event) {
    const data = (event.data === "PONG") ? { type : "PONG" } : JSON.parse(event.data);
    this.dispatch(webSocketMessage(data));
  }

}

export default ReconnectingWebSocket;
