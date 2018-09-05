/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Email from "@material-ui/icons/Email";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import navbarsStyle from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

import image from "assets/img/bg.jpg";
import profileImage from "assets/img/faces/avatar.jpg";

import { getConnectionStratey } from '../../authorization';

function HeaderLinks({ ...props }) {
  const { classes, auth, userProfile, userRoles,userGroups, history} = props;

  var headerText = "Welcome, " + userProfile.nickname;

  return (
    <List className={classes.list}>
                  {getConnectionStratey(userProfile) !== "social" && !userRoles.includes("Federated User") ? (
                    <ListItem className={classes.listItem}>
                    <Button
                      href="#pablo"
                      className={classes.navLink}
                      onClick={e => e.preventDefault()}
                      color="transparent"
                    >
                      Discover
                    </Button>
                  </ListItem>
                  ) : null}
                  
                  {(userRoles && userRoles.includes("admin")) ? (
                     <ListItem className={classes.listItem}>
                     <Button
                       href="#pablo"
                       className={classes.navLink}
                       onClick={e => window.open("https://delegateadmin.eu.webtask.io/auth0-delegated-admin/en/users",'_blanl')}
                       color="transparent"
                     >
                       User Management
                     </Button>
                   </ListItem>
                  ) : ('')}

                   {(userRoles && userRoles.includes("admin")) ? (
                     <ListItem className={classes.listItem}>
                     <Button
                       href="#pablo"
                       className={classes.navLink}
                       onClick={e => auth.getUsers()}
                       color="transparent"
                     >
                       Invoke Get Users
                     </Button>
                   </ListItem>
                  ) : ('')}
                  {(userGroups && userGroups.includes("marketing")) ? (
                     <ListItem className={classes.listItem}>
                     <Button
                       href="#pablo"
                       className={classes.navLink}
                       color="transparent">
                      Campaigns
                     </Button>
                   </ListItem>
                  ) : ('')}
                   {(userGroups && userGroups.includes("marketing")) ? (
                   <ListItem className={classes.listItem}>
                   <Button
                     href="#pablo"
                     className={classes.navLink}
                     color="transparent">
                    Collateral
                   </Button>
                 </ListItem>
                  ) : ('')}
                   {(userGroups && userGroups.includes("marketing")) ? (
                 <ListItem className={classes.listItem}>
                 <Button
                   href="#pablo"
                   className={classes.navLink}
                   color="transparent">
                  Eloqua
                 </Button>
               </ListItem>
                  ) : ('')}
                            
                 {!userRoles.includes("Federated User") ? (
                  <ListItem className={classes.listItem}>
                    <Button
                      justIcon
                      round
                      href="#pablo"
                      className={classes.notificationNavLink}
                      onClick={e => e.preventDefault()}
                      color="rose"
                    >
                      <Email className={classes.icons} />
                    </Button>
                  </ListItem>
                 ) : (
                  <ListItem className={classes.listItem}>

                    <CustomDropdown
                      left
                      caret={false}
                      hoverColor="black"
                      dropdownHeader={headerText}
                      buttonText={
                        <img
                        src="http://personal.lse.ac.uk/marcoci/dgl2015/LSE2.png"
                          className={classes.img}
                          alt="profile"
                        />
                      }
                      buttonProps={{
                        className:
                          classes.navLink + " " + classes.imageDropdownButton,
                        color: "transparent"
                      }}
                      dropdownList={[
                        {"text":"Me", "link" : "profile"},
                        {"text": "Settings and other stuff", "link" : "profile"},
                        {"text":"Sign out", "link" : "logout"}
                      ]}
                      auth={auth}
                      history={history}
                    />
                </ListItem>
                 )}
                  
                  <ListItem className={classes.listItem}>
                    <CustomDropdown
                      left
                      caret={false}
                      hoverColor="black"
                      dropdownHeader={headerText}
                      buttonText={
                        <img
                          src={userProfile.picture}
                          className={classes.img}
                          alt="profile"
                        />
                      }
                      buttonProps={{
                        className:
                          classes.navLink + " " + classes.imageDropdownButton,
                        color: "transparent"
                      }}
                      dropdownList={[
                        {"text":"Me", "link" : "profile"},
                        {"text": "Settings and other stuff", "link" : "profile"},
                        {"text":"Sign out", "link" : "logout"}
                      ]}
                      auth={auth}
                      history={history}
                    />
                  </ListItem>
                </List>
  );
}

export default withStyles(navbarsStyle)(HeaderLinks);
