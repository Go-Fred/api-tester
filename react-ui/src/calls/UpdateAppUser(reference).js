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
      error: false,
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

  // To be implemented for modularity
  handleValueChange = key, event => {
    this.setState( {
      [key]: event.target.value
    }
  );
  };

  // See below (ParametersInput): formHandler={(e)=> this.handleValueChange(obj.key, e); }

  // See below (parametersArray) : key: 'sampleProperties'




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

  updateJSON = (JSONArray, state) => {
    if(state){
      JSONArray[0].properties = { lang: "en-ca", items: 3 }
    }
    return(JSONArray)
  }

  generatePreview = (JSONArray, state) => {

    this.updateJSON(JSONArray, state)
    console.log(JSONArray)

    return <CallPreview
              JSONPreview={JSONArray}
              />
  }

  render() {
    var inputs = {
      userId: this.handleMessageChange
    };

    var highLightJSONArray = [{
        givenName: this.state.nameParamValue,
        surname: this.state.surnameParamValue,
        email: this.state.emailParamValue,
        signedUpAt: this.state.signedUpAtParamValue,
    }]

    var parametersArray = [
      {
        label: "givenName",
        formHandler: this.handleNameValueChange,
        value: this.state.nameParamValue,
        type: "text"
      },
      {
        label: "surname",
        formHandler: this.handleSurnameValueChange,
        value: this.state.surnameParamValue,
        type: "text"
      },
      {
        label: "email",
        formHandler: this.handleEmailValueChange,
        value: this.state.emailParamValue,
        type: "text"
      },
      {
        label: "signedUpAt",
        formHandler: this.handleSignedUpAtValueChange,
        value: this.state.signedUpAtParamValue,
        type: "text"
      },
      {
        label: "Add some sample properties",
        formHandler: () => {this.handlePropertiesValueChange(highLightJSONArray)},
        value: this.state.signedUpAtParamValue,
        type: "checkbox",
        key: 'sampleProperties'
      }
    ];

    return (
      <div>
        <div className="parameters">
          <h2>Parameters</h2>
        {parametersArray.map(obj =>
          <ParametersInput
            label={obj.label}
            formHandler={(e)=> this.handleValueChange(obj.key, e); }
            value={obj.value}
            type={obj.type}
          />
        )}
        </div>
        <div>
          {this.generatePreview(highLightJSONArray,this.state.isPropertiesChecked)}
        </div>
        <div className="result-section-dropdown">
          <div className="button-container">
            <button onClick={() => {this.updateAppUser(highLightJSONArray[0])}}>{this.props.buttonTitle}</button>
          </div>
          <Result
            data={this.state.responsePayload}
            title="Response: "
            error={this.state.error}
            errorPayload={this.state.errorPayload}
          />
        </div>
      </div>
    );
  }
}

export default UpdateAppUser;
