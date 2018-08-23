import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Email from "@material-ui/icons/Email";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import profileImage from "assets/img/faces/avatar.jpg";
import SectionTabs from "views/Components/Sections/SectionTabs.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";
import TeamSection from "./Sections/TeamSection.jsx";
import WorkSection from "./Sections/WorkSection.jsx";
import Welcome from "./Sections/Welcome.jsx";
import SubscriberSection from "./Sections/SubscriberSection.jsx";


const dashboardRoutes = [];

class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      userProfile : {}
    };

  }


  componentWillMount(){

    const {auth} = this.props;
  
      if(auth && auth.isAuthenticated()){
  
        const profile = auth.getProfileCached();
  
        // console.log(profile);
  
        if(profile){
          this.setState({userProfile : profile})
        }else{
           auth.getProfile((err, profile) =>{
            // console.log("loaded the button");
           
            this.setState({userProfile : profile})
           
          });

        }      
      }
  }

  render() {
    const { classes, auth, ...rest } = this.props;

    var teamSection;
    var workSection;
    var subscriptionSection;

    const { userProfile } = this.state;

    var userProfileString = "";

    var userRoles = [];
    var userGroups = [];

    if(userProfile){

      userProfileString = JSON.stringify(userProfile, null, 2) 

      if(userProfile["https://example.com/roles"]){
        userProfile["https://example.com/roles"].map(((name, index) => {
          userRoles.push(name);
        }));
      }
      if(userProfile["https://example.com/groups"]){
        userProfile["https://example.com/groups"].map(((name, index) => {
          userGroups.push(name);
        }));
      }
    }

    if(auth && auth.isAuthenticated()){
     

      if(userGroups.includes("marketing") || userRoles.includes("admin") ){
        teamSection = <TeamSection />;
      }

      if(userGroups.includes("cs") || userGroups.includes("engineering") || userRoles.includes("admin") ){
        workSection = <WorkSection />;
      }

      if((userGroups === undefined || userGroups.length == 0)){
        subscriptionSection = <SubscriberSection />;
      }

      
    }
    

    return (
      <div>
       
         <Header
              brand="Navbar with notifications"
              color="dark"
              rightLinks={<HeaderLinks auth = {auth} />}
              fixed
              changeColorOnScroll={{
                height: 400,
                color: "white"
              }}
              auth = {auth}
              userProfile = {userProfile}
              userRoles = {userRoles}
              userGroups = {userGroups}
              {...rest}
            />
        <Parallax filter image={require("assets/img/landing-bg.jpg")}>
          <div className={classes.container}>
            <Welcome />
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {teamSection}
            {workSection}
            <ProductSection />
            
          </div>
          {subscriptionSection}
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
