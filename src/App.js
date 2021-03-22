import logo from './logo.svg';
import './App.css';
import React, { createContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './component/firebase.config';
import Home from './component/Home/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './component/Header/Header';
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp';
import NotFound from './component/NotFound/NotFound';
import Destination from './component/Destination/Destination';
import PickUpPoint from './component/PickUpPoint/PickUpPoint';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';




if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}


export const UserContext = createContext();

function App(props) {
  

  const [loggedInUser,setLoggedInUser] = useState({});
  // console.log(loggedInUser);

  return (

    <UserContext.Provider value = {[loggedInUser,setLoggedInUser]}>
      
      <p>email:{loggedInUser.email}</p>
    <Router className="main-container">
        <Header></Header>

        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route  path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <SignUp></SignUp>
          </Route>
          {/* <PrivateRoute path="/signup">
            <SignUp></SignUp>
          </PrivateRoute> */}
          <PrivateRoute path="/destination/:id">
            <Destination></Destination>
          </PrivateRoute>
          {/* <Route path="/destination/:id">
            <Destination></Destination>
          </Route> */}
          <Route path="/pickup">
            <PickUpPoint></PickUpPoint>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
          
        </Switch>
    </Router>
    </UserContext.Provider>


  );
}

export default App;
