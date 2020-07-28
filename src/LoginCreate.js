import React, { Component } from "react";
import firebase, { auth, provider } from './firebase.js';

class LoginCreate extends Component {
    constructor() {
        super();
        this.state = {
            fullName: "",
            address: "",
            phone: "",
            email: "",
            password: "",
            user: null,
            image: {}
        }
    }

    onSubmit = (event) => {
        // Prevent default on form submit so page doesn't refresh
        event.preventDefault();

        // call new account function on submit.
        this.newAccount();

        // Update state here to empty when user logs in or makes new account (latter of which will probably be it's own page)

        // decide where after account creation we redirect the user to.
        // this.props.history.push("/create")

        // this set state probably needs to be moved, seems to interfere with data.
        setTimeout( () => {
            this.setState({
                fullName: "",
                address: "",
                phone: "",
                email: "",
                password: "",
                image: {},
            })
        }, 1000)
    }

    onChange = async (event) => {
        let user = event.target.name;
        let pass = event.target.value;
        await this.setState({
            [user]: pass
        })
    }

    // function allows us to target the image and save it to file. We save it to state so it can be accessed in the newAccount function in order to upload it to the server.
    uploadImage = (e) => {
        const file = e.target.files[0];
        console.log(file);

        this.setState({
            image: file
        })
    }

    newAccount = async () => {
        try {
            // const user = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            const user = await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(auth => {
                // allows a user to upload a profile image. Need to expand on this to include documents when user is logged in (create new Class Component to feed logged in user data)
                firebase
                    .storage()
                    .ref("users")
                    .child(auth.user.uid + "/profile.jpg")
                    .put(this.state.image);
            })
            // set user to state so we can check if logged in.
            this.setState({
                user
            })

            // here we need to pass the user logged in to another Class component in order to feed the user info to the logged in user. the below .auth().onAuth... is how we check if user is logged in, and if so, grab the data.

        } catch (error) {
            console.log(error.message)
        }




        // need to test if I can create the new user outside of onAuth below when I set the user login info to state in the newAccount function. The below function is to get user data to be able to feed info to the user as needed. to which I can print it to screen.

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                // print user id and email if logged in
                // console.log(user.uid) 
                // console.log(user.email)

                //test for new user to tie User info to UID, issue with empty states on db, could be due to state clearing before the below runs (async)
                const newUser = {
                    name: this.state.fullName,
                    phone: this.state.phone,
                    address: this.state.address,
                    uid: user.uid,
                    email: user.email
                }
                
                // write new user to db
                const writeUserData = (user) => {
                firebase.database().ref('users/' + user.uid).set(user).catch(error => {
                    console.log(error.message)
                    });
                }
                writeUserData(newUser)
            }
        })

        
    }




    render() {
        return(
            <div>
                <h1>Create new user here!</h1>

                <form action="submit" onSubmit={this.onSubmit}>
                    <fieldset>
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" value={this.state.fullName} onChange={this.onChange} name="fullName" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="address">Address</label>
                        <input type="text" value={this.state.address} onChange={this.onChange} name="address" />

                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" value={this.state.phone} onChange={this.onChange} name="phone" />
                    </fieldset>


                    <fieldset>
                    <label htmlFor="email">Email</label>
                    <input type="email" value={this.state.email} onChange={this.onChange} name="email" />

                    <label htmlFor="password">Password</label>
                    <input type="password" value={this.state.password} onChange={this.onChange} name="password" />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="file">Upload File</label>
                        <input type="file" onChange={this.uploadImage} name="email" />
                    </fieldset>


                    <button>Create account</button>

                </form>

            </div>
            
        )
    }


}

export default LoginCreate;