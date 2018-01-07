import React, { Component } from "react";
import Result from "./Result.js";
import GetAppUser from "./calls/GetAppUser.js";
import UpdateAppUser from "./calls/UpdateAppUser.js";
import DeleteUserProfile from "./calls/DeleteUserProfile.js";
import GetChannels from "./calls/GetChannels.js";
import PostMessage from "./calls/PostMessage.js";


class SelectedCall extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    switch (this.props.call){
      case "Get App User":
        return <GetAppUser buttonTitle={this.props.call}/>
        break;
      case "Update App User":
        return <UpdateAppUser buttonTitle={this.props.call}/>
        break;
      case "Delete User Profile":
        return <DeleteUserProfile buttonTitle={this.props.call}/>
        break;
      case "Get User Channel Entities":
        return <GetChannels buttonTitle={this.props.call}/>
        break;
      case "Post Message":
        return <PostMessage buttonTitle={this.props.call}/>
        break;
      default:
        return
        break
    }
  }
}

export default SelectedCall;
