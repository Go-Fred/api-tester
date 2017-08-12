import React, { Component } from "react";
var Highlight = require("react-highlight");

class GetAppUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIdPayload: null,
      smoochUserId: null,
      errorPayload: null,
      error: false
    };
  }

  getAppUser = () => {
    fetch("/appuser")
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          userIdPayload: JSON.stringify(data.appUser, null, 2),
          smoochUserId: JSON.stringify(data.appUser._id, null, 2),
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
    } else {
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
      <div className="step-container">
        <h2>
          {" "}<span className="number">2.</span> API Call{" "}
          <span className="arrow">→</span> Smooch{" "}
          <span className="arrow">→</span> Webhook
        </h2>
        <div className="text-container">
          <p className="api-call">
            GET /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}
          </p>
          <div className="button-container">
            <button onClick={this.getAppUser}>Get app user </button>
          </div>
          {this.renderHighlight(this.state.smoochUserId, "Smooch userId (_id): ")}
          {this.renderHighlight(this.state.userIdPayload, "Full user payload: ")}
        </div>
      </div>
    );
  }
}

export default GetAppUser;
