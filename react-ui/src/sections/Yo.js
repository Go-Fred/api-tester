import React, { Component } from "react";
var Highlight = require("react-highlight");
import Result from "../Result.js";
import { subscribeToMessagePayload } from '../socket/message.js';
import Smooch from 'smooch'
import { channelsConf } from "../config/channels.js"

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

  onButtonClicked = (name, e) => {


  }

  render() {
    return (
      <div className="call-section">
        <h2>
          {" "} Initiate the conversation{" "}
        </h2>
        <h3>
          {" "}App User{" "}
          <span className="arrow">→</span> Smooch{" "}
          <span className="arrow">→</span> Webhook
        </h3>
        <div>
        Channel:
        {channelsConf.map(channel =>
          <button
            onClick={(e)=> this.onButtonClicked(channel.name, e) }>{channel.name}
          </button>
        )}
        </div>
        <p>Before sending a request, let's simulate a message from the user and see the payload that a webhook targeting "message:AppUser" gets in return.</p>
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
