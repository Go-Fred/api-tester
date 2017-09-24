import React, { Component } from "react";
var Highlight = require("react-highlight");
import Result from "../Result.js";
import { subscribeToMessagePayload } from '../socket/message.js';

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
    window.sendyo();
    fetch("/yo")
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          appUserMessagePayload: JSON.stringify(data.messages, null, 2),
          error: false
        });
      })
      .catch(e => {
        this.setState({
          errorPayload: `API call failed: ${e}`,
          error: true
        });
      });
  };

  renderHighlight = () => {
    console.log(this.state.error);
    if (!this.state.error) {
      if (this.state.appUserMessagePayload) {
        return (
          <div>
            <p> Webhook payload (message part):</p>
            <Highlight className="JSON">
              {this.state.appUserMessagePayload}
            </Highlight>
          </div>
        );
      }
    } else {
      return (
        <Highlight className="JSON">
          {"Please retry, Smooch was not ready yet..."}
        </Highlight>
      );
    }
    return;
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
        <p>Before sending out some calls, let's try simulating a "yo" message from the user and see the payload a webhook targeting message:AppUser gets in return.</p>
        <div className="call">
          <div className="button-container">
            <button onClick={this.sendYo}>Send yo</button>{" "}
          </div>
          {this.renderHighlight()}
        </div>
      </div>
    );
  }
}

export default Yo;
