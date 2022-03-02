import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import redirect from "react-router-dom/es/Redirect";
import {Redirect} from "react-router-dom";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }


  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/login" });
    if(currentUser) {
      UserService.getUserBoard().then(
          response => {

            this.setState({
              content: response.data.data
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
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>User details</h3>
          <table className="table">
            <tbody>
              <tr>
                <td className="font-weight-bold">Email</td>
                <td>{this.state.content.email}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">First name</td>
                <td>{this.state.content.first_name}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Last name</td>
                <td>{this.state.content.last_name}</td>
              </tr>
              <tr>
                <td className="font-weight-bold">Title</td>
                <td>{this.state.content.title}</td>
              </tr>
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}
