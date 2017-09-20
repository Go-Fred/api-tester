import React, { Component } from "react";
import Result from "../Result.js";
import ParametersInput from "../ParametersInput.js";
import CallPreview from "../CallPreview.js";

class UpdateAppUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIdPayload: null,
      smoochUserId: null,
      errorPayload: null,
      messageValue: "",
      nameParamValue:"",
      surnameParamValue:"",
      error: false
    };
  }

  handleMessageChange = event => {
    this.setState({ messageValue: event.target.value });
    console.log(this.state.messageValue);
  };

  handleNameValueChange = event => {
    this.setState({ nameParamValue: event.target.value });
    console.log(this.state.nameParamValue);
  };

  handleSurnameValueChange = event => {
    this.setState({ surnameParamValue: event.target.value });
    console.log(this.state.surnameParamValue);
  };

  updateAppUser = () => {
    fetch("/appuser")
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
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

  generatePreview = () => {

    var highLightJSONArray = [{
      coreJSON: {
        type: "text",
        text: this.state.nameParamValue,
        role: "appMaker",
        metadata: { lang: "en-ca", items: 3 }
      }
    }]

      if(this.state.surnameParamValue){
        highLightJSONArray[0].sideJSON = {
          key: "action",
          JSONtext: [{test: this.state.surnameParamValue}]
        }
      }

    return <CallPreview
              JSONPreview={highLightJSONArray}
              />
  }

  render() {
    var inputs = {
      userId: this.handleMessageChange
    };

    var parametersArray = [
      {
        label: "Name",
        formHandler: this.handleNameValueChange,
        value: this.state.nameParamValue
      },
      {
        label: "Surname",
        formHandler: this.handleSurnameValueChange,
        value: this.state.surnameParamValue
      }
    ];

    return (
      <div>
        <div className="parameters">
          <h2>Parameters</h2>
        {parametersArray.map(obj =>
          <ParametersInput
            label={obj.label}
            formHandler={obj.formHandler}
            value={obj.value}
          />
        )}
        </div>
        <div>
          {this.generatePreview()}
        </div>
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
