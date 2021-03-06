import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import { Redirect } from 'react-router-dom'


// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import headerStyle from "assets/jss/material-kit-react/components/headerStyle.jsx";

import { getB2B } from '../../authorization';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      userProfile : {}
    };
    
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
  }

  userProfile;

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
  }
  headerColorChange() {
    const { classes, changeColorOnScroll, userRoles } = this.props;

    var {color} = this.props;

    

    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  }

  componentWillUnmount() {

    if (this.props.changeColorOnScroll) {
      window.removeEventListener("scroll", this.headerColorChange);
    }
  }

componentWillMount(){

 //  this.loadProfile();
}

loadProfile(){
  const {auth} = this.props;

  if(auth && auth.isAuthenticated()){

    const profile = auth.getProfileCached();

    console.log(profile);

    if(profile){
      this.setState({userProfile : profile})
    }else{
       auth.getProfile((err, profile) =>{
        console.log("loaded the button");
        this.userProfile = profile;
        this.setState({userProfile : profile})
         console.log(this.userProfile);
      });
     // console.log(this.userProfile);
    }      
  }
}


  render() {
    const {
      classes,
      rightLinks,
      leftLinks,
      brand,
      fixed,
      absolute,
      userRoles
    } = this.props;

    var {color} =  this.props;

    if(userRoles && userRoles.includes("Federated User")){
      color = "rose";
    }

    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed
    });

    const {auth, userProfile, userGroups, history} = this.props;

    var button = "A0";

    var buttonFederated = "NMSaml";

    var buttonLuLogin = "Stark"

    var buttonOxford = "Uni"

    var buttonnmaws = "AWS"

    var buttonazure = "Azure"

    

    // console.log(this.userProfile)

    // const { userProfile } = this.state;

    var brandComponent = <Button onClick={() => {auth.login()}} className={classes.title}>{button}</Button>;
    var samlButton = <Button onClick={() => {auth.loginFederated()}} className={classes.title}>{buttonFederated}</Button>;
    var lsuButton = <Button onClick={() => {auth.loginLU()}} className={classes.title}>{buttonLuLogin}</Button>;
    var oxfordButton = <Button onClick={() => {auth.loginOxford()}} className={classes.title}>{buttonOxford}</Button>;
    var awsButton = <Button onClick={() => {auth.loginCustomDb()}} className={classes.title}>{buttonnmaws}</Button>;
    var azureAdButton = <Button onClick={() => {auth.loginAzureAd()}} className={classes.title}>{buttonazure}</Button>;


    if(auth && auth.isAuthenticated()){
      if(userProfile){

        if(userRoles && ( userRoles.includes("Federated User") || userRoles.includes("Business User") ) ){
          button =  userProfile.nickname + ' @ ' + getB2B(userProfile)
          
        }else{
          button = userProfile.nickname;
        }

        
      }else{
        button = "Loading profile" + userProfile  ;
      }
      
      brandComponent = <Button onClick={() => {this.props.history.push(`/`)}}  className={classes.title}>{button}</Button>;
      // samlButton = null;
      //lsuButton = null;
      oxfordButton = null;
    }
    
    return (
      <AppBar className={appBarClasses}>
        <Toolbar className={classes.container}>
          {leftLinks !== undefined ? brandComponent : null}
          <div className={classes.flex}>
             {brandComponent}
             {samlButton}
             {lsuButton}
             {oxfordButton}
             {awsButton}
             {azureAdButton}
          </div>
          <Hidden smDown implementation="css">
            {(auth && auth.isAuthenticated() && userProfile) ? (<HeaderLinks 
              auth = {auth}
              history = {history}
              userProfile = {userProfile}
              userRoles = {userRoles}
              userGroups = {userGroups}
              />) : (<div></div>)}
          </Hidden>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
          >
            <div className={classes.appResponsive}>
              {leftLinks}
              {rightLinks}
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
    );
  }
}

Header.defaultProp = {
  color: "white"
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark"
  ]),
  rightLinks: PropTypes.node,
  leftLinks: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // this.props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // this.props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark"
    ]).isRequired
  })
};

export default withStyles(headerStyle)(Header);
