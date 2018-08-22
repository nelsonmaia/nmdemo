import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Auth from 'views/Auth/Auth.jsx';
import Callback from "views/Callback/Callback.jsx";
import history from 'views/History/History.jsx';
import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import Controller from "views/Controller/Controller.jsx";

import "assets/scss/material-kit-react.css?v=1.2.0";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}


ReactDOM.render(
  <Router history={history}>
   <div>
      <Route path="/profile-page" render={(props) => <ProfilePage auth={auth} {...props} />} />
      <Route path="/" render={(props) => <Controller auth={auth} {...props} />} />
      <Route exact path="/" render={(props) => <LandingPage auth={auth} {...props} />} />
      <Route path="/components" render={(props) => <Components auth={auth} {...props} />} />
      <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} /> 
        }}/>
      </div>
  </Router>
  ,
  document.getElementById("root")
);
