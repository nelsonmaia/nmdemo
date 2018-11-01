import auth0 from "auth0-js";
import history from '../History/History.jsx';
import axios from 'axios';

export default class Auth {

  constructor() {
    this.getProfile = this.getProfile.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getProfileMetadata = this.getProfileMetadata.bind(this);
    this.getProfileCached = this.getProfileCached.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  userProfile;

  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  });

  login() {
    this.auth0.authorize({
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: 'id_token',
      scope: 'openid profile email '
    });
  }

  loginCustomDb() {
    this.auth0.authorize({
      connection: 'aws-nmauth0',
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: 'token id_token',
      scope: 'openid profile email '
    });
  }

  loginFederated(){


    this.auth0.authorize({
      
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      // audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: 'token id_token',
      scope: 'openid profile email ',
      connection: 'SAML-Auth0-IDP'});

  }

loginLU(){
  this.auth0.authorize({
    connection: 'LondonUniversity',
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
   //  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile email '
  });
}

loginOxford(){
  this.auth0.authorize({
    connection: 'OxfordUniversity',
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
   //  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile email '
  });
}


  handleAuthentication() {

    console.log("handling authentication");

    this.auth0.parseHash({
      __enableIdPInitiatedLogin: true
    },(err, authResult) => {
      if (authResult &&  authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        console.log("no else", err);
        localStorage.setItem('auth_error', JSON.stringify(err, null, '  '))
        history.replace('/error');

        console.log(err);
      }else{
        console.log("Not authen");
        history.replace('/');
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.getProfile((err, profile) => {
     
      });
    // navigate to the home route
    history.replace('/profile-page');
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    this.auth0.logout({returnTo: process.env.REACT_APP_AUTH0_CALLBACK_URL});
    history.replace('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  // User Profile Section

  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No Access Token found');
    }
    return accessToken;
  }

  getProfile(cb) {

    let accessToken = this.getAccessToken();

    
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      console.log("in the getProfile " + accessToken);
  
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
      return profile;
    });
  }

  getUsers(){
    axios.post(process.env.REACT_APP_NMAPI_URL,this.userProfile, {
      headers: { Authorization: "Bearer " + this.getAccessToken()}
    }).then(response => {console.log(response);});
  }

  getProfileCached(){

  //  console.log(this.userProfile);

    if(this.userProfile){
      return this.userProfile;      
    }
    this.getProfile((err, profile) => {
      //console.log("profile empty");
      this.userProfile = profile;
      //console.log(this.userProfile);
      return this.userProfile;
    })  
  }

  getProfileMetadata(profile, cb) {

    // console.log("getProfileMetadata");

    // const { getAccessToken } = this.auth;
    // const  profile  = this.userProfile

    // const API_URL = 'https://delegateadmin.eu.auth0.com/api/v2';
    // const headers = { 'Authorization': `Bearer ${this.getAccessToken()}` }

    // //this.setState({profileResponse : {}});

    // axios.get(`${API_URL}/users/${profile.sub}`, { headers })
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));

    // var auth0Manage = new auth0.Management({
    //   domain: 'delegateadmin.eu.auth0.com',
    //   token: this.getAccessToken()
    // });

    // auth0Manage.getUser(profile.sub, (err, getResult) => {
    //   //console.log("getUser was...");
    //   //console.log(JSON.stringify(getResult, null, '  '))
    //   cb(err, getResult);

    // })

    axios.post(process.env.REACT_APP_NMAPI_URL,this.userProfile, {
      headers: { Authorization: "Bearer " + this.getAccessToken()}
    }).then(response => {cb(null, response.data)});


  }

  getUserRoles(userProfile){

    var roles = userProfile["https://example.com/roles"];

    

    return [];
  }

}