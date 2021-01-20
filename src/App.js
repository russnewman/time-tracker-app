import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
// import MainWindow from "./components/mainWindow.component";

import TopBar from "./components/topbar.component";
import Navbar from './components/Navbar';

import Home from './pages';
import Dashboard from './pages/dashboard';
import Employees from './pages/employees';
import Profile from './pages/profile';
// import About from './pages/about'
// import Services from './pages/services'
// import Contact from './pages/contact'
// import Login from './pages/about'



function App() {

  return (<Router>
      {/* <div className="App">
        <div className="auth-wrapper"> */}
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/employees' component={Employees} />
              <Route path='/profile' component={Profile} />
            </Switch>
        {/* </div>
      </div> */}
    </Router>
  );
}

export default App;