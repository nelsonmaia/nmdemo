import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import SectionInput from "./Sections/SectionInput.jsx";
import queryString from 'query-string';

import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";

class Components extends React.Component {

    redirectContinue(){
 window.location = "https://google.com"
    }

  render() {
    const { classes,auth, ...rest } = this.props;

   let params = queryString.parse(this.props.location.search)

    return (
      <div>
        <Header
          brand="Material Kit React"
          rightLinks={<HeaderLinks />}
          fixed
          color="transparent"
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          auth = {auth}
          {...rest}
        />
        

        <div className={classNames(classes.main, classes.mainRaised)}>
          
          For security reasons, we are suggesting our users to enroll a second factor of authentication, would you like to enroll your MFA now?
          <GridItem md={12} className={classes.textCenter}>
              <Button color="primary" size="lg" simple onClick={() => {window.location = "https://" + process.env.REACT_APP_AUTH0_DOMAIN + "/continue?enroll=true&state="+params.state}}>
                Enroll MFA 
              </Button>
              <Button color="primary" size="lg" simple onClick={() => {window.location = "https://" + process.env.REACT_APP_AUTH0_DOMAIN + "/continue?enroll=false&state="+params.state}}>
                Continue without MFA
              </Button>
            
          </GridItem>

        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(componentsStyle)(Components);
