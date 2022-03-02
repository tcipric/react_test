import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
import {Redirect} from "react-router-dom";
import _forEach from 'lodash/forEach'

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {


        const contentHtml = response.data.data.map((post, index) =>
            <tr>
              <td>{index+1}</td>
              <td>{post.name}</td>
              <td>{post.sortname}</td>
              <td>{post.phonecode}</td>
            </tr>
        );

        this.setState({
          content: response.data.data,
          contentHtml: contentHtml
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
          <h3>Admin board</h3>
          <table className="table">
            <tbody>

            { this.state.contentHtml }

            </tbody>
          </table>
        </header>
      </div>
    );
  }
}
