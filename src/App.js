import React, { Component } from 'react';
import './App.css';
import Login from "./Login.js";
import LoginCreate from "./LoginCreate.js";
import firebase from "./firebase.js";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { auth } from 'firebase';



class App extends Component {

  constructor() {
    super();
    this.state = {
      
    }
  }

  


  render() {
    return (
      <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        <h1>Welcome to my test site!</h1>
        {/* <Login /> */}
        <Route exact path="/login" component={Login} />
        {/* <Route path="/login/create" component={LoginCreate} /> */}
        <Route path="/create" component={LoginCreate} />
      </div>
      </Router>
    );

  }
}

export default App;
