import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import AuthService from "./services/auth.service"


import Dashboard from './pages/dashboard';
import Employees from './pages/employees';
import Profile from './pages/profile';
import Leaders from './pages/leaders';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    };
  }


  render(){


    const currentUser = this.state.currentUser
    return (

                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route path="/sign-in" component={Login} />
                  <Route path="/sign-up" component={SignUp} />
                  <Route path='/dashboard'>
                    <Dashboard/>
                  </Route>
                  <Route path='/employees' component={Employees}/>
                  <Route path='/leaders' component={Leaders}/>
                  <Route path='/profile'>
                    <Profile/>
                  </Route>
                </Switch>      
    );
  }
}

export default App;