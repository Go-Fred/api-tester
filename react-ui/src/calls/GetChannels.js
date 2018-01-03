import React, { Component } from "react";
import Result from "../Result.js";
import ParametersInput from "../ParametersInput.js";
import CallPreview from "../CallPreview.js";

class GetChannels extends Component {
  constructor(props) {
    super(props);
    this.handleCustomUserIdValueChange = this.handleCustomUserIdValueChange.bind(
      this
    );
    this.handleUserIdValueChange = this.handleUserIdValueChange.bind(this);
    this.state = {
      responsePayload: null,
      errorPayload: null,
      userIdParamValue: "",
      isCustomUserIdChecked: false,
      anotherArray: [
        {
          label: "Use a custom userId",
          formHandler: () => {
            this.handleCustomUserIdValueChange();
          },
          value: "test",
          type: "checkbox",
          key: ""
        }
      ],
      error: false
    };
  }

  componentWillMount() {}

  handleUserIdValueChange = event => {
    this.setState({ userIdParamValue: event.target.value });
    console.log(this.state.userIdParamValue);
  };

  handleCustomUserIdValueChange = () => {
    this.setState({
      isCustomUserIdChecked: !this.state.isCustomUserIdChecked
    });
  };

  // updateParametersRender = (array) => {
  //   array.map(obj =>
  //     <ParametersInput
  //       label={obj.label}
  //       formHandler={obj.formHandler}
  //       value={obj.value}
  //       type={obj.type}
  //       key={obj.key}
  //     />
  //   );
  // };

  getChannels = userId => {
    console.log(userId);
    fetch("/getchannels", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(userId)
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if(data){
        this.setState({
          responsePayload: JSON.stringify(data, null, 2),
          error: false
        });
      }else {
        this.setState({
          responsePayload: "No channel",
          error: false
        });
      }
      })
      .catch(e => {
        this.setState({
          errorPayload: `API call failed: ${e}`,
          error: true
        });
      });
  };

  render() {
    var parametersArray = [
      {
        label: "userId",
        formHandler: this.handleUserIdValueChange,
        value: this.state.userIdParamValue,
        type: "text"
      }
    ];

    var checkboxArray = [
      {
        label: "Use a custom userId",
        formHandler: this.handleCustomUserIdValueChange,
        value: "test",
        type: "checkbox",
        key: ""
      }
    ]

    var JSONUserId = {
      userId: this.state.userIdParamValue
    }

    return (
      <div>
        <div className="parameters">
          <h2>Parameters</h2>
          <div>
            {checkboxArray.map(obj =>
              <ParametersInput
                label={obj.label}
                formHandler={obj.formHandler}
                value={obj.value}
                type={obj.type}
                key={obj.key}
              />
            )}
            {!this.state.isCustomUserIdChecked
              ? ""
              : parametersArray.map(obj =>
                  <ParametersInput
                    label={obj.label}
                    formHandler={obj.formHandler}
                    value={obj.value}
                    type={obj.type}
                    key={obj.key}
                  />
                )}
          </div>
        </div>
        <div className="result-section-dropdown">
          <div className="button-container">
            <button
              onClick={() => {
                this.getChannels(JSONUserId);
              }}
            >
              {this.props.buttonTitle}
            </button>
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

export default GetChannels;
