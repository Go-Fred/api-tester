import React, { Component } from "react";
import { MenuItem, DropdownButton } from "react-bootstrap";
import SelectedCall from "../SelectedCall.js"
import SelectedCallName from "../SelectedCallName.js"

class AppUser extends Component {
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
        <h2>  Send a request </h2>
        <h3>
          {" "}Server request <span className="arrow">→</span> Smooch{" "}
          <span className="arrow">→</span> Response
        </h3>
        <p>
          Now that the user has started the conversation, we can send API requests to Smooch.
        </p>
        <div className="call">
          <DropdownButton title={this.state.dropdownTitle} id={`dropdown-basic`}>
            <MenuItem eventKey="Get App User" onSelect={(eventKey) => this.dropdownClick(eventKey)} >Get App User</MenuItem>
            <MenuItem eventKey="Update App User" onSelect={(eventKey) => this.dropdownClick(eventKey)} >Update App User</MenuItem>
            <MenuItem eventKey="Delete User Profile" onSelect={(eventKey) => this.dropdownClick(eventKey)} >Delete User Profile</MenuItem>
            <MenuItem eventKey="Get User Channel Entities" onSelect={(eventKey) => this.dropdownClick(eventKey)} >Get User Channel Entities</MenuItem>
            <MenuItem eventKey="Post Message" onSelect={(eventKey) => this.dropdownClick(eventKey)} >Post Message</MenuItem>
          </DropdownButton>
          <SelectedCallName call={this.state.dropdownTitle} />
          <SelectedCall call={this.state.dropdownTitle} />
        </div>
      </div>
    );
  }
}

export default AppUser;
