import React, { Component } from "react";
import Result from "../Result.js";

class DeleteUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reponsePayload: null,
      errorPayload: null,
      error: false
    };
  }

  deleteUserProfile = () => {
    fetch("/deleteuserprofile")
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          reponsePayload: JSON.stringify(data, null, 2),
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
      <div className="result-section-dropdown">
        <div className="button-container">
          <button onClick={this.deleteAppUser}>{this.props.buttonTitle} </button>
        </div>
        <Result
          data={this.state.reponsePayload}
          title="Reponse Payload: "
          error={this.state.error}
          errorPayload={this.state.errorPayload}
        />
      </div>
    );
  }
}

export default DeleteUserProfile;
