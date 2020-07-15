import React, { Component } from "react";
import firebase from "./firebase.js";

class LoginCreate extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    }

    onSubmit = (event) => {
        // Prevent default on form submit so page doesn't refresh
        event.preventDefault();

        this.newAccount();

        // Update state here to empty when user logs in or makes new account (latter of which will probably be it's own page)

        // decide where after account creation we redirect the user to.
        // this.props.history.push("/create")
    }

    onChange = async (event) => {
        let user = event.target.name;
        let pass = event.target.value;
        await this.setState({
            [user]: pass
        })
    }

    newAccount = async () => {
        try {
            const user = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
            console.log(user.uid)

            const userInfo = {
                fName: this.state.firstName,
                lName: this.state.lastName,
            }
            this.writeUserData(userInfo);

        } catch (error) {
            console.log(error.message)
        }
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log(user.uid) 
                console.log(user.email)  }
        })
    }

    checkLogIn = () => {
    }

    writeUserData = (user) => {
        firebase.database().ref('users/' + user.uid).set(user).catch(error => {
            console.log(error.message)
        });
    }

    render() {
        return(
            <div>
                <h1>Create new user here!</h1>

                <form action="submit" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" value={this.state.name} onChange={this.onChange} name="firstName" />

                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" value={this.state.lastName} onChange={this.onChange} name="lastName" />
                    </fieldset>


                    <fieldset>
                    <label htmlFor="email">email</label>
                    <input type="email" value={this.state.email} onChange={this.onChange} name="email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" value={this.state.password} onChange={this.onChange} name="password" />
                    </fieldset>


                    <button>Create account</button>

                </form>

            </div>
            
        )
    }


}

export default LoginCreate;