import React, { Component } from "react";
import Result from "./Result.js";
import GetAppUser from "./calls/GetAppUser.js";
import UpdateAppUser from "./calls/UpdateAppUser.js";

class SelectedCall extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var call = this.props.call;

    if (call === "Get App User") {
      return <GetAppUser />;
    } else if (call === "Update App User") {
      return (<UpdateAppUser />
      );
    } else {
      return;
    }
  }
}

export default SelectedCall;
