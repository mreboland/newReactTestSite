import React, { Component } from "react";
import firebase from "./firebase.js";
import LoginCreate from "./LoginCreate.js";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            user: null,
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    login = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
                console.log(user.uid)
                console.log(user.email)
            });
    }
    

    logout = () => {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    onSubmit = (event) => {
        // Prevent default on form submit so page doesn't refresh
        event.preventDefault();

        // Update state here to empty when user logs in or makes new account (latter of which will probably be it's own page)
    }

    onChange = async(event) => {
        let user = event.target.name;
        let pass = event.target.value;
        await this.setState({
            [user]: pass
        })
    }



    render() {
        return (
            <div>
                <h1>Login</h1>

                <form action="submit">
                    <label htmlFor="email">email</label>
                    <input type="email" value={this.state.email} onChange={this.onChange} name="userName"/>

                    <label htmlFor="password">Password</label>
                    <input type="password" value={this.state.password} onChange={this.onChange} name="password"/>

                    <button>Login</button>

                </form>

                <div>
                <h2>Google Login</h2>
                <p>{this.state.user ? <button onClick={this.logout}>Log Out</button> : <button onClick={this.login}>Log In</button>}</p>
                </div>
                {/* update below with link to sign-up page. */}
                <Router>
                <div>
                    <Link to="/login/create">Create a new account</Link>
                    <Route path="/login/:create" component={LoginCreate} />
                </div>
                    
                </Router>

            </div>

        )
    }
}



export default Login;