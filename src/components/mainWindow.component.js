import React from 'react';
import '../App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages';
import About from '../pages/about';
import Services from '../pages/services';
import Contact from '../pages/contact';
import Login from "./login.component"
import  SignUp from "./signup.component"



function mainWindow() {
  return (
    <Router>
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/services' component={Services} />
        <Route path='/contact-us' component={Contact} />
        <Route path='/sign-in' component={Login}/>
        <Route path='/sign-up' component={SignUp}/>
      </Switch>
    </Router>
  );
}

export default mainWindow;