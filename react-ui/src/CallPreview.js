import React, { Component } from "react";
var Highlight = require("react-highlight");

class CallPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postMessagePayload: null,
      errorPayload: null,
      error: false
    };
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

  renderHighlightExample = (JSONArray) => {

    var mergedJSON = JSONArray[0]

    // if(JSONArray[0].sideJSON){
    //   var value = JSONArray[0].sideJSON.key
    //   mergedJSON[value] = JSONArray[0].sideJSON.JSONtext
    // }
    // return JSON.stringify(mergedJSON, null, 2);
    return JSON.stringify(mergedJSON, null, 2);
  };

  render() {
    return (
      <div>
        <Highlight className="JSON">
          {this.renderHighlightExample(this.props.JSONPreview)}
        </Highlight>
      </div>
    );
  }
}

export default CallPreview;
