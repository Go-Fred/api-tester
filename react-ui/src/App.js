import React, { Component } from "react";
import "./App.css";
import Yo from "./sections/Yo.js"
import AppUser from "./sections/AppUser.js"
import PostMessage from "./sections/PostMessage.js"


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
        <AppUser />
        <PostMessage />
      </div>
    );
  }
}

export default App;
