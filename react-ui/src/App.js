import React, { Component } from "react";
import "./App.css";
var Highlight = require("react-highlight");
import Yo from "./Yo.js"
import GetAppUser from "./GetAppUser.js"
import PostMessage from "./PostMessage.js"


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
    //this.handleClick = this.handleClick.bind(this)
  }

  render() {
    return (
      <div className="App">
        <div className="intro">
          <h1>Smooch API Tester</h1>
          <p>Explore Smooch API with few sample calls</p>
        </div>
        <Yo />
        <GetAppUser />
        <PostMessage />
      </div>
    );
  }
}

export default App;
