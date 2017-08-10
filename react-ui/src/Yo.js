import React, { Component } from "react";
var Highlight = require("react-highlight");

class Yo extends Component {
  constructor(props) {
    super(props);
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
    console.log(this.state.error)
    if (!this.state.error){
      if (this.state.appUserMessagePayload) {
        return (
          <div>
            <p> Webhook payload:</p>
            <Highlight className="JSON">
              {this.state.appUserMessagePayload}
            </Highlight>
          </div>
        );
      }
    }
    else {
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
      <div className="yo-container">
        <p> 1. App User -> Smooch -> Webhook</p>
        <div className="button-container">
          <button onClick={this.sendYo}>Send yo</button>{" "}
          <p>App User is sending "yo"</p>
        </div>
        {this.renderHighlight()}
      </div>
    );
  }
}

export default Yo;
