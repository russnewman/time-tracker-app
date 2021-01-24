import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";


import Dashboard from './pages/dashboard';
import Employees from './pages/employees';
import Profile from './pages/profile';


class App extends Component {

  constructor(props) {
    super(props);
    // this.logOut = this.logOut.bind(this);

    this.state = {
      // showModeratorBoard: false,
      // showAdminBoard: false,
      currentUser: undefined,
    };
  }


  render(){
    const token = this.props.token
    return (
      <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/employees' component={Employees} />
                <Route path='/profile' component={Profile} />
              </Switch>
      </Router>
    );
  }
}

export default App;