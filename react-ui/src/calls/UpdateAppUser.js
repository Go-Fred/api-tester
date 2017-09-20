import React, { Component } from "react";
import Result from "../Result.js";
import ParametersInput from "../ParametersInput.js";
import CallPreview from "../CallPreview.js";

class UpdateAppUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responsePayload: null,
      errorPayload: null,
      messageValue: "",
      nameParamValue:"",
      surnameParamValue:"",
      emailParamValue:"",
      signedUpAtParamValue:"",
      isPropertiesChecked:false,
      error: false
    };
  }

  handleMessageChange = event => {
    this.setState({ messageValue: event.target.value });
  };

  handleNameValueChange = event => {
    this.setState({ nameParamValue: event.target.value });
  };

  handleSurnameValueChange = event => {
    this.setState({ surnameParamValue: event.target.value });
  };

  handleEmailValueChange = event => {
    this.setState({ emailParamValue: event.target.value });
  };

  handleSignedUpAtValueChange = event => {
    this.setState({ signedUpAtParamValue: event.target.value });
  };

  handlePropertiesValueChange = (JSONArray) => {

    this.setState({
      isPropertiesChecked: !this.state.isPropertiesChecked,
    });

    console.log(!this.state.isPropertiesChecked)

    if(!this.state.isPropertiesChecked){
      console.log(JSONArray[0])
      JSONArray[0].properties = { lang: "en-ca", items: 3 }
    }

  };

  updateAppUser = (JSONArray) => {
    console.log(JSONArray)
    fetch("/updateappuser", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(JSONArray)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          responsePayload: JSON.stringify(data, null, 2),
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

    var inputs = {
      userId: this.handleMessageChange
     }

    return (
      <div>
        <ParametersInput
          label="userId"
          formHandler={inputs.userId}
          value={this.state.messageValue}
        />
        <div className="result-section">
          <div className="button-container">
            <button onClick={this.updateAppUser}>Update App User </button>
          </div>
          <Result
            data={this.state.smoochUserId}
            title="Smooch userId (_id): "
            error={this.state.error}
            errorPayload={this.state.errorPayload}
          />
          <Result
            data={this.state.userIdPayload}
            title="Full user payload: "
            error={this.state.error}
            errorPayload={this.state.errorPayload}
          />
        </div>
      </div>
    );
  }
}

export default UpdateAppUser;
