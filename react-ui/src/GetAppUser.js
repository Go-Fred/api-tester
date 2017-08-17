import React, { Component } from "react";
import { MenuItem, DropdownButton } from "react-bootstrap";
var Highlight = require("react-highlight");

const options = ["one", "two", "three"];

const defaultOption = options[0];

class GetAppUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIdPayload: null,
      smoochUserId: null,
      errorPayload: null,
      dropdownTitle: 'Get App User',
      error: false
    };
  }

  getAppUser = () => {
    fetch("/appuser")
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          userIdPayload: JSON.stringify(data.appUser, null, 2),
          smoochUserId: JSON.stringify(data.appUser._id, null, 2),
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

  dropdownClick = (eventKey) => {
    console.log(eventKey)
    console.log(this.state.dropdownTitle)
    this.setState({dropdownTitle: eventKey})
    console.log(this.state.dropdownTitle)
  }

  renderHighlight = (data, title) => {
    if (!this.state.error) {
      if (data) {
        return (
          <div>
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
        <div>
          <p>
            {title}
          </p>
          <Highlight className="JSON">
            {this.state.errorPayload}
          </Highlight>
        </div>
      );
    }
    return;
  };

  render() {
    return (
      <div className="call-section">
        <h2>  AppUser calls </h2>
        <h3>
          {" "}Server request <span className="arrow">→</span> Smooch{" "}
          <span className="arrow">→</span> Response
        </h3>
        <p>
          Now that the user has started the conversation, let's test the calls
          to manipulate the user's info.
        </p>
        <div className="call">
          <DropdownButton title={this.state.dropdownTitle} id={`dropdown-basic`}>
            <MenuItem eventKey="Get App User" onSelect={(eventKey) => this.dropdownClick(eventKey)} >Get App User</MenuItem>
            <MenuItem eventKey="2">Another action</MenuItem>
            <MenuItem eventKey="3" >Active Item</MenuItem>
            <MenuItem eventKey="4">Separated link</MenuItem>
          </DropdownButton>
          <p className="api-call">
            GET /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}
          </p>
          <div className="button-container">
            <button onClick={this.getAppUser}>Get app user </button>
          </div>
          {this.renderHighlight(
            this.state.smoochUserId,
            "Smooch userId (_id): "
          )}
          {this.renderHighlight(
            this.state.userIdPayload,
            "Full user payload: "
          )}
        </div>
      </div>
    );
  }
}

export default GetAppUser;
