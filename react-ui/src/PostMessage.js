import React, { Component } from "react";
var Highlight = require("react-highlight");

class PostMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postMessagePayload: null,
      errorPayload: null,
      error: false
    };
  }

  postMessage = () => {
    fetch("/postmessage")
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          postMessagePayload: JSON.stringify(data, null, 2),
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

  renderHighlight = (data, title) => {
    if (!this.state.error) {
      if (data) {
        return (
          <div>
            <p>
              {title}
            </p>
            <Highlight className="JSON">
              {data}
            </Highlight>
          </div>
        );
      }
    }
    else {
      return (
        <div>
          <p>
            {title}
          </p>
          <Highlight className="JSON">
            {this.state.errorPayload}
          </Highlight>
        </div>
      );
    }
    return;
  };

  render() {
    return (
      <div>
        <div className="getAppUser-container">
          <p> 3. API Call -> Smooch -> Webhook</p>
          <div>
            <button onClick={this.postMessage}>Post Message</button>
          </div>
        </div>
        <div>
          {this.renderHighlight(this.state.postMessagePayload, "Post Message Payload: ")}
        </div>
      </div>
    );
  }
}

export default PostMessage;
