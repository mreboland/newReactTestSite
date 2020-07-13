import React, { Component } from 'react';
import './App.css';
import Login from "./Login.js";
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
            <li><Link exact to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        <h1>Welcome to Rob's gay old site</h1>
        {/* <Login /> */}

        <Route path="/login" component={Login} />
      </div>
      </Router>
    );

  }
}

export default App;
