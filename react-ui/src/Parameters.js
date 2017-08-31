import React, { Component } from "react";

class Parameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paramValues: "",
      messageValue: "",
      error: false
    };
  }

  renderHighlightExample = () => {
    var jsonmessage = {
      type: "text",
      text: this.state.messageValue,
      role: "appMaker",
      metadata: { lang: "en-ca", items: 3 }
    };

    var actions = [
      {
        type: "link",
        text: this.state.buttonValue,
        uri: "http://example.com",
        metadata: { buttonId: "vinegar" }
      }
    ];

    if (this.state.buttonValue) {
      jsonmessage.actions = actions;
    }

    return JSON.stringify(jsonmessage, null, 2);
  };

  render() {
    var Entries = ["Message", "Button"]

    return (
      <div className="call-section">
        <h2>Parameters</h2>
        <div className="parameters">
          {
            Entries.map(value =>
              <label for={value}>
              value:
              <input
                className="parameter-input"
                type="text"
                value={this.state.messageValue}
                onChange={this.handleMessageChange}
              />
            </label>))
          }

          <label>
            Button:
            <input
              className="parameter-input"
              type="text"
              value={this.state.buttonValue}
              onChange={this.handleButtonChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Parameters;
