import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";

import { getConnectionStratey } from '../../../authorization';


class Welcome extends React.Component {
    render() {
        const { classes, userGroups, userRoles, auth, profile } = this.props;

        const isSocial = getConnectionStratey(profile) || userGroups.length === 0;

        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    {!isSocial || !(userGroups.length === 0) ? (
                        <h1 className={classes.title}>
                            {userGroups.includes('marketing') ?
                                ("Marketing is the future") :
                                auth.isAuthenticated() ? userRoles.includes("Federated User")  || userRoles.includes("Business User") || userGroups.length === 0  ? null : ("The authentication and authorization has began") :
                                    ("Your Story Starts With Us.")}
                        </h1>
                        

                    ) : (
                            <h1 className={classes.title}>
                                Welcome to this journey!
                            </h1>
                        )}
                        {userRoles.includes("Business User") ? (
                            <h1 className={classes.title}>This is a B2B case</h1>
                        ) : null}
                        {userRoles && !userRoles.includes("Federated User") ? (
                             <h4>
                             Bacon ipsum dolor amet shank porchetta boudin chicken. Tenderloin bacon bresaola,
                             pig picanha jerky boudin kevin swine. Capicola shank pig kevin beef ribs prosciutto.
     
     
                         </h4>
                        ): null}
                        
                   
                    {auth.isAuthenticated() && !isSocial  && !userRoles.includes("Federated User") ? (
                        <h4>User groups are: {JSON.stringify(userGroups, null, '  ')}</h4>
                    ) : null}
                    {auth.isAuthenticated() && !isSocial && !userRoles.includes("Federated User") ? (
                        <h4>User roles are: {JSON.stringify(userRoles, null, '  ')}</h4>
                    ) : null}
                    {isSocial && !userRoles.includes("Federated User") ? (
                        <h4>Social connection user</h4>
                    ) : null}
                    <br />
                    {isSocial || userGroups.length === 0 ? (
                        <Button
                            color="danger"
                            size="lg"
                            href="#subscribe"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Subscribe
                    </Button>
                    ) : null}


                    {userGroups.includes('marketing') || isSocial || userRoles.includes("Federated User") || userGroups.length === 0 ? null :
                        (

                            <Button
                                color="danger"
                                size="lg"
                                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <i className="fas fa-play" />Watch video
                    </Button>
                        )
                    }
                </GridItem>
            </GridContainer>
        );
    }
}

export default withStyles(workStyle)(Welcome);