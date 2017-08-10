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
          <p> 2. API Call -> Smooch -> Webhook</p>
          <div>
            <button onClick={this.getAppUser}>Get app user </button>
          </div>
        </div>
        <div>
          {this.renderHighlight(this.state.userIdPayload, "user Id Payload: ")}
          {this.renderHighlight(this.state.smoochUserId, "user: ")}
        </div>
      </div>
    );
  }
}

export default GetAppUser;
