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
    redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    responseType: 'token id_token',
    scope: 'openid profile email read:users read:current_user'
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication(cb) {

    console.log("handling authentication");

    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        console.log("no else");
        history.replace('/');


        console.log(err);

        cb();

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
    axios.post("http://localhost:3001/users",this.userProfile, {
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

    axios.post("http://localhost:3001/users",this.userProfile, {
      headers: { Authorization: "Bearer " + this.getAccessToken()}
    }).then(response => {cb(null, response.data)});


  }

  getUserRoles(userProfile){

    var roles = userProfile["https://example.com/roles"];

    

    return [];
  }

}