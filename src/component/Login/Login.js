import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from 'react-bootstrap';
import { UserContext } from '../../App';
import firebaseConfig from '../firebase.config';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

const Login = () => {


    const [user, setUser] = useState({
        isSignIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const handleChange = (e) => {
        // console.log(e.target.name, e.target.value);
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;

        }
        if (isFormValid) {

            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            // setNewUser(newUserInfo);
        }
    }


    const handleSubmit = (e) => {

       

       
            firebase
              .auth()
              .signInWithEmailAndPassword(user.email, user.password)
              .then(res => {
                const newUserInfo = { ...user };
                newUserInfo.error = " ";
                newUserInfo.success = true;
                setUser(newUserInfo);
                console.log('Sign in user info', res.user);
              })
              .catch(function (error) {
                // Handle Errors here.
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
                // ...
              });
          
        
        e.preventDefault();
    }

    const history = useHistory();
    const handleDestination = () => {
        history.push('/signup');

    }


    var provider = new firebase.auth.GoogleAuthProvider();
    const handleGoogleSignIn = () => {

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;var user = result.user;
                console.log(user);
                setUser(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;var credential = error.credential;
            });

    }

    return (
        <div className="main-container">
            <form className="login-container" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="text" name="email" onChange={handleChange} placeholder={"Username or Email"} required></input>
                <br />
                <input type="Password" name="password" onChange={handleChange} placeholder={" Password"} required></input>
                <br />
                
                <button >Login</button>
                <br/>
                 <p>Or</p>
                <br/>
            </form>
            <p>Don't have an account? <Link to={`SignUp`}> Create a new account</Link>   </p>
            {/* <button onClick={handleGoogleSignIn}>  Continue with Google </button> */}
            <Link to={`destination`}>
            <button onClick={handleGoogleSignIn}>  Continue with Google </button>
            </Link>
            {/* <p>email:{user.email}</p> */}
 </div>
    );
};

export default Login;