import React, { Component } from "react";

class ParametersInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <label>
        {this.props.label}:
        <input
          className="parameter-input"
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.formHandler}
        />
        </label>
    );
  }
}

export default ParametersInput;
