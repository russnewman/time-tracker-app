import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import MainWindow from "./components/mainWindow.component";

import TopBar from "./components/topbar.component";
import Navbar from './components/Navbar';

import Home from './pages';
import About from './pages/about';
import Services from './pages/services';
import Contact from './pages/contact';
// import About from './pages/about'
// import Services from './pages/services'
// import Contact from './pages/contact'
// import Login from './pages/about'



function App() {

  return (<Router>
      <div className="App">
        <div className="auth-wrapper">
            {/* <TopBar/> */}
            {/* <Navbar /> */}
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path='/about' component={About} />
              <Route path='/services' component={Services} />
              <Route path='/contact-us' component={Contact} />
            </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;