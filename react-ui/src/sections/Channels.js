import React, { Component } from "react";
import { MenuItem, DropdownButton } from "react-bootstrap";
import SelectedCall from "../SelectedCall.js"
import SelectedCallName from "../SelectedCallName.js"
import channelsConfig from "../config/channels.js"

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownTitle: 'Get App User',
    };
  }

  dropdownClick = (eventKey) => {
    this.setState({dropdownTitle: eventKey})
  }

  render() {
    return (
      <div className="call-section">
        <h2>Channels</h2>
        <p>
          Choose a channel to test.
        </p>
        


      </div>
    );
  }
}

export default AppUser;
