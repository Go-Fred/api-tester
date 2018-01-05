import React, { Component } from "react";
import "./App.css";
import Yo from "./sections/Yo.js"
import AppUser from "./sections/AppUser.js"
import PostMessage from "./sections/PostMessage.js"
import Smooch from 'smooch'

const APP_ID = '587feb5700671a330053dd34'
const BASE_URL = 'https://api.smooch.io/sdk'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    };
    //this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
  Smooch.init({
    appId: APP_ID,
    configBaseUrl: BASE_URL
  }).then(() => {
    Smooch.open();
  });
}

  render() {
    return (
      <div className="App">
        <div className="intro">
          <h1>Smooch Demo Environment</h1>
          <p>Test & Explore Smooch API through an elegant interface</p>
        </div>
        <Yo />
        <AppUser />
        <PostMessage />
      </div>
    );
  }
}

export default App;
