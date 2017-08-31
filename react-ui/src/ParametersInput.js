import React, { Component } from "react";

class ParametersInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="parameters">
        <label>
        {this.props.label}:
        <input
          className="parameter-input"
          type="text"
          value={this.props.value}
          onChange={this.props.formHandler}
        />
        </label>
      </div>
    );
  }
}

export default ParametersInput;
