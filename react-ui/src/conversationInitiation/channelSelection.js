import React, { Component } from "react";

class ChannelSelection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      Channel:
      {channelsConf.map(channel =>
        <button
          onClick={(e)=> this.onButtonClicked(channel.key, e) }>{channel.key}
        </button>
      )}
      </div>
    );
  }
}

export default ChannelSelection;
