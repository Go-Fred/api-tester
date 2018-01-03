import React, { Component } from "react";
var Highlight = require("react-highlight");
import Result from "../Result.js";
import { subscribeToMessagePayload } from '../socket/message.js';
import Smooch from 'smooch'

class Yo extends Component {
  constructor(props) {
    super(props);
    subscribeToMessagePayload((data) => this.setState({
        appUserMessagePayload: data }));
    this.state = {
      appUserMessagePayload: null,
      error: false,
      errorPayload: null,
      fetching: true
    };
  }

  sendYo = () => {
    Smooch.sendMessage("yo");
  };

  render() {
    return (
      <div className="call-section">
        <h2>
          {" "} A first user message{" "}
        </h2>
        <h3>
          {" "}App User{" "}
          <span className="arrow">→</span> Smooch{" "}
          <span className="arrow">→</span> Webhook
        </h3>
        <p>Before sending out some calls, let's try simulating a "yo" message from the user and see the payload that a webhook targeting "message:AppUser" gets in return.</p>
        <div className="call">
          <div className="button-container">
            <button onClick={this.sendYo}>Send yo</button>{" "}
          </div>
          <Result data={this.state.appUserMessagePayload} title="Webhook payload (message part): " error={this.state.error} errorPayload={this.state.errorPayload}/>
        </div>
      </div>
    );
  }
}

export default Yo;
