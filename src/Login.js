import React, { Component } from "react";
import firebase, { auth, provider } from './firebase.js';

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// const provider = new firebase.auth.GoogleAuthProvider();
// const auth = firebase.auth();


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
                this.props.history.push("/portal")
                // console.log(user.uid)
                // console.log(user.email)
            });
    }
    
    // below function is to be able to login with email and pass. Once logged in, send user to the user portal which will print out there name and the attached image associated with the image (if they did).
    emailLogin = () => {
        const user = firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(auth => {
            this.setState({
                user
            })

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });

        setTimeout(() => {
            this.props.history.push("/portal")
        }, 1000)
    }

    logout = () => {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
                this.props.loginCheck(this.state)
                
            });
    }

    onSubmit = (event) => {
        // Prevent default on form submit so page doesn't refresh
        event.preventDefault();

        // Update state here to empty when user logs in or makes new account (latter of which will probably be it's own page)
        this.emailLogin();
        
    }

    onChange = async(event) => {
        let user = event.target.name;
        let pass = event.target.value;
        await this.setState({
            [user]: pass
        })
        // this.props.loginCheck(this.state)
    }

    
    goLogin = (e) => {
        e.preventDefault();
        this.props.history.push("/create")
    }



    render() {
        return (
            <div>
                <h1>Login</h1>

                <form action="submit" onSubmit={this.onSubmit}>
                    <label htmlFor="email">email</label>
                    <input type="email" value={this.state.email} onChange={this.onChange} name="email"/>

                    <label htmlFor="password">Password</label>
                    <input type="password" value={this.state.password} onChange={this.onChange} name="password"/>

                    <button>Login</button>

                </form>

                <div>
                <h2>Google Login</h2>
                <p>{this.state.user ? <button onClick={this.logout}>Log Out</button> : <button onClick={this.login}>Log In</button>}</p>
                </div>
                {/* update below with link to sign-up page. */}
                <div>
                    <a href="" onClick={this.goLogin}>Create a new account</a>

                </div>
            </div>

        )
    }
}



export default Login;