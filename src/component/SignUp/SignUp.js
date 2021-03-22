import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './SingUp.css'
import firebase from "firebase/app";
import "firebase/auth";
import { Button } from 'react-bootstrap';
import { UserContext } from '../../App';
import firebaseConfig from '../firebase.config';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee, faUserPlus } from '@fortawesome/free-solid-svg-icons'

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

// firebase.initializeApp(firebaseConfig);

const SignUp = () => {

    const [newUser, setNewUser] = useState(false);

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

    const handleBlur = (e) => {
        // console.log(e.target.name, e.target.value);
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
            // const isEmailValid = /\S+@\S+\.\S+/.test(e.target.value);
            // console.log(isEmailValid);
        }

        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            // console.log(isPasswordValid && passwordHasNumber);
            isFormValid = isPasswordValid && passwordHasNumber;

        }
        if (isFormValid) {

            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
            setNewUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if ( user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in 
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    setUser(newUserInfo);
                    // ..
                });
        }

        if (user.email && user.password) {

            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    // Signed in
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });

        }
        e.preventDefault();

    }

    const updateUserName = name => {

        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name

        }).then(function () {
            console.log('user name updated successfully');
        }).catch(function (error) {
            console.log(error);
        });
    }
    
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const handleLogin = () => {
        history.push('/destination');

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


            {/* <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser"> New User!</label> */}

            <form className="singup-container" onSubmit={handleSubmit}>
                <h1>Create an account</h1>
                <br />

                {

                    <input type="text" name="name" onBlur={handleBlur} placeholder={"Enter Your Name"} required></input>
                }
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder={"Username or Email"} required></input>
                <br></br>
                <input type="Password" name="password" onBlur={handleBlur} placeholder={" Password"} required></input>
                <br />

                <input type="Password" name="password" onBlur={handleBlur} placeholder={"Confirm Password"} required></input>

                <br />
                <input type="checkbox" name=" " id="" />
                <label > Remember me</label>
                <br />

                {
                    // <button> <Link  to={`/destination`}> Create an account </Link>  </button>
                    // <button onClick={handleLogin}>  Create an account   </button>
                    <button>  Create an account   </button>
                }


                <br />

                <p>Already have an account? <Link to='/destination'> Login</Link>   </p>

                <br />
                <p>Or</p>
                <br />
                {/* <Button variant="success"  >   Continue with Google </Button> */}


            </form>
            {/* <button onClick={handleGoogleSignIn}>  Continue with Google   </button> */}
            <Link to='/destination'>
            <button onClick={handleGoogleSignIn}>  Continue with Google </button>
            </Link>
            {/* <p>email:{user.email}</p> */}
            <p style={{ color: 'red' }}> {user.error}</p>
            {user.success && <p style={{ color: 'green' }}> User {newUser ? 'created' : 'logged In'} successfully</p>}
            {user.success && <p style={{ color: 'green' }}> User  successfully</p>}
        </div>
    );
};



export default SignUp;