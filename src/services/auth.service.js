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
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data)
        return response.data
      });
  }

  logout() {
    localStorage.removeItem("user");
  }


  register(firstName, lastName, email, password, department, role){
    console.log(role)
    return axios.post(API_URL + "signup", {
        firstName,
        lastName,
        email,
        password,
        department,
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


  render(){
    return(
      <Router>
      <Switch>
        {/* <Route exact path='/' component={Login} />
        <Route path="/sign-in" component={Login} />
        <Route path="/sign-up" component={SignUp} /> */}
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/employees' component={Employees} />
        <Route path='/profile' component={Profile} />
      </Switch>
</Router>
    )
  }
}

export default new AuthService();