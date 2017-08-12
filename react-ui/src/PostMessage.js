import React, { Component } from "react";
var Highlight = require("react-highlight");

class PostMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postMessagePayload: null,
      errorPayload: null,
      buttonValue: "",
      messageValue: "",
      error: false
    };
  }

  postMessage = () => {
    console.log(this.state.buttonValue)
    if(this.state.buttonValue != ""){
    fetch("/postmessage/message/" + this.state.messageValue +'/button/' + this.state.buttonValue)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          postMessagePayload: JSON.stringify(data, null, 2),
          error: false
        });
      })
      .catch(e => {
        this.setState({
          errorPayload: `API call failed: ${e}`,
          error: true
        });
      });
    }else{
      fetch("/postmessage/message/" + this.state.messageValue)
        .then(response => {
          if (!response.ok) {
            throw new Error(`status ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          this.setState({
            postMessagePayload: JSON.stringify(data, null, 2),
            error: false
          });
        })
        .catch(e => {
          this.setState({
            errorPayload: `API call failed: ${e}`,
            error: true
          });
        });
    }
  };

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

  handleButtonChange = event => {
    this.setState({ buttonValue: event.target.value });
    console.log(this.state.buttonValue);
  };

  handleMessageChange = event => {
    this.setState({ messageValue: event.target.value });
    console.log(this.state.messageValue);
  };

  renderHighlightExample = () => {
    var jsonmessage = {
     type: 'text',
     text: this.state.messageValue,
     role: 'appMaker',
     metadata: {"lang": "en-ca", "items": 3}
   }

    var actions = [
       {
         type: 'link',
         text: this.state.buttonValue,
         uri: 'http://example.com',
         metadata: {buttonId: 'vinegar'}
       }
     ]


   if(this.state.buttonValue){
     jsonmessage.actions = actions
   }

  return (  JSON.stringify(jsonmessage, null, 2))
  }


  render() {
    return (
      <div className="step-container">
        <h2>
          {" "}<span className="number">3.</span> API Call{" "}
          <span className="arrow">→</span> Smooch{" "}
          <span className="arrow">→</span> Webhook
        </h2>
        <div className="text-container">
          <p className="api-call">
            POST /v1/apps/{"{"}appId{"}"}/appusers/{"{"}smoochId|userId{"}"}/messages
          </p>
          <h2>Parameters</h2>
          <div className="parameters">
            <label>
              Message:
              <input
                className="parameter-input"
                type="text"
                value={this.state.messageValue}
                onChange={this.handleMessageChange}
              />
            </label>
            <label>
              Button:
              <input
                className="parameter-input"
                type="text"
                value={this.state.buttonValue}
                onChange={this.handleButtonChange}
              />
            </label>
          </div>
          <div>
            <Highlight className="JSON">
              {this.renderHighlightExample()}
            </Highlight>
          </div>
          <div className="button-container">
            <button onClick={this.postMessage}>Post Message</button>
          </div>
          {this.renderHighlight(
            this.state.postMessagePayload,
            "Post Message response payload: "
          )}
        </div>
      </div>
    );
  }
}

export default PostMessage;
