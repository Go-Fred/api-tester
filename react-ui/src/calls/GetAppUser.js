import React, { Component } from "react";
import Result from "../Result.js"

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
        console.log(data)
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

  render() {
    return (
      <div className="result-section">
        <div className="button-container">
          <button onClick={this.getAppUser}>Get app user </button>
        </div>
        <Result data={this.state.smoochUserId} title="Smooch userId (_id): " error={this.state.error} errorPayload={this.state.errorPayload}/>
        <Result data={this.state.userIdPayload} title="Full user payload: " error={this.state.error} errorPayload={this.state.errorPayload}/>
      </div>
    );
  }
}

export default GetAppUser;
