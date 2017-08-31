import React, { Component } from "react";
import { MenuItem, DropdownButton } from "react-bootstrap";
var Highlight = require("react-highlight");

class SelectedCallName extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text;
    if (this.props.call === "Get App User"){
      text = <p className="api-call"> GET /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}</p>
    } else if (this.props.call === "Update App User") {
      text = <p className="api-call"> PUT /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}</p>
    }
    return (text);
  }
}

export default SelectedCallName;
