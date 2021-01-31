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
        // console.log("FFF",response)

        if (response.data.userInfo.token) {
          sessionStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data
      });
  }

  logout() {
    sessionStorage.removeItem("user");
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
      if (response.data.userInfo.token) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data
      // console.log("FFF",response)
    })
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
  }
}

export default new AuthService();