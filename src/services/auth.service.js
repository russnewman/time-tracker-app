import axios from "axios";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Dashboard from '../pages/dashboard';
import Employees from '../pages/employees';
import Profile from '../pages/profile';

const API_URL = "http://localhost:8080/auth/";

class AuthService {

  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          // console.log("AUT",localStorage)
        }
        console.log("Response", response)
        // console.log("AUT2",localStorage)
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

//   register(username, email, password) {
//     return axios.post(API_URL + "signup", {
//       username,
//       email,
//       password
//     });
//   }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();