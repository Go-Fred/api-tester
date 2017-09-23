import React, { Component } from "react";
import { MenuItem, DropdownButton } from "react-bootstrap";
var Highlight = require("react-highlight");

class Result extends Component {
  constructor(props) {
    super(props);
  }

  renderHighlight = (data, title, error, errorPayload) => {
    if (!error) {
      if (data) {
        return (
          <div className="result">
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
        <div className="result">
          <p>
            {title}
          </p>
          <Highlight className="JSON">
            {errorPayload}
          </Highlight>
        </div>
      );
    }
    return;
  };

  render() {
    return (
      <div>
        {this.renderHighlight(this.props.data,this.props.title,this.props.error,this.props.errorPayload)}
      </div>
    );
  }
}

export default Result;
