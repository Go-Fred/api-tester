import React, { Component } from "react";
import { MenuItem, DropdownButton } from "react-bootstrap";
var Highlight = require("react-highlight");

class SelectedCallName extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    switch (this.props.call){
      case "Get App User":
        return <p className="api-call"> GET /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}</p>
        break;
      case "Update App User":
        return <p className="api-call"> PUT /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}</p>
        break;
      case "Delete User Profile":
        return <p className="api-call"> DEL /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}</p>
        break;
      case "Get User Channel Entities":
        return <p className="api-call"> GET /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}/channels</p>
        break;
      case "Post Message":
        return  <p className="api-call"> POST /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}/messages</p>
        break;        
      default:
        return
        break
    }
  }
}

export default SelectedCallName;
