import axios from "axios";

const API_URL = "https://staging.truckindigital.com/api";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/v1/user/login", {
        email,
        password
      })
      .then(response => {

        console.log(response);
        if (response.data.token.access_token) {
          response.data.user.accessToken = response.data.token.access_token;
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        return response.data.user;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
