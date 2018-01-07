import React, { Component } from "react";

class UserMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p></p>
      <div className="call">
        <div className="button-container">
          <button onClick={this.sendYo}>Send yo</button>{" "}
        </div>
    );
  }
}

export default UserMessage;
