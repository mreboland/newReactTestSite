import React, { Component } from "react";
import firebase, { auth, provider } from './firebase.js';

class UserPortal extends Component {

    constructor() {
        super();
        this.state = {
            user: null,
            image: [],
            userName: "",

        }
    }

    componentDidMount() {
        auth.onAuthStateChanged( (user) => {
            if (user) {
                this.setState({ user });
                    console.log(user)

                    this.setState({
                        userName: user.displayName
                    })
                    // call the doc grab in order to display it.
                    this.documentGrab();
            }
        });
    }

    // call the below to grab the image under profile.jpg
    documentGrab = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase
                    .storage()
                    .ref("users")
                    .child(user.uid + "/profile.jpg")
                    .getDownloadURL()
                    .then(imgUrl => {
                        this.setState({
                            image: imgUrl
                        })
                    });
                console.log(user)
            }
        })
    }

    onClick = () => {        
        if (!this.state.user) {
            this.props.history.push("/login")
        } else {
            auth.signOut()
                .then(() => {
                    this.setState({
                        user: null
                    });
                });
            this.props.history.push("/")
        }
    }


    render() {
        return (
            <div>
                {this.state.user ?
                    
                    <div>
                        <h1>Hello {this.state.userName}!</h1>
                        <p>Here I must add logged in specific data!</p>
                        <img src={this.state.image} alt=""/>
                    </div>
            
                :
                
                    <div>
                        <h1>you must be logged in to view data!</h1>
                    </div>
                }
                
                <p>{this.state.user ? <button onClick={this.onClick}>Log Out</button> : <button onClick={this.onClick}>Log In</button>}</p>

            </div>
        )
    }
}

export default UserPortal;