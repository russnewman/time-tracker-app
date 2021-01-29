import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {

  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.userInfo.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password, fullName, department, position, role){
    return axios.post(API_URL + "signup", {
        email,
        password,
        fullName,
        department,
        position,
        role
    })
    .then(response => {
      return response.data
    })
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();