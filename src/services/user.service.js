import axios from 'axios';
import authHeader from './auth-header';
import {Redirect} from "react-router-dom";
import React from "react";
import AuthService from "./auth.service";

const API_URL = 'http://localhost/api/v1';
const user = AuthService.getCurrentUser();

class UserService {
  getPublicContent() {
    return axios.get(API_URL + '/countries/1');
  }

  getUserBoard() {
    return axios.get(API_URL + '/users/' + user.id, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + '/countries/1', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + '/countries', { headers: authHeader() });
  }
}

export default new UserService();
