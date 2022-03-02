import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import {Redirect} from "react-router-dom";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {

    UserService.getModeratorBoard().then(
      response => {
        this.setState({
          content: response.data,
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    const user = AuthService.getCurrentUser();
    this.state.showAdminBoard = user && user.roles_list ? user.roles_list.includes("Admin User") : false;
    if (!user) {
      return <Redirect to={'/login'} />
    }
    if (!this.state.showAdminBoard) {
      return <Redirect to={'/home'} />
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Moderator board</h3>
        </header>
      </div>
    );
  }
}
