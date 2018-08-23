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

class Welcome extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <h1 className={classes.title}>Your Story Starts With Us.</h1>
                    <h4>
                        Bacon ipsum dolor amet shank porchetta boudin chicken. Tenderloin bacon bresaola,
                         pig picanha jerky boudin kevin swine. Capicola shank pig kevin beef ribs prosciutto.
                          Hamburger capicola pork pastrami ground round meatball corned beef brisket, 
                          boudin pork loin bacon pork belly kielbasa picanha leberkas.
                </h4>
                    <br />
                    <Button
                        color="danger"
                        size="lg"
                        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fas fa-play" />Watch video
                </Button>
                </GridItem>
            </GridContainer>
        );
    }
}

export default withStyles(workStyle)(Welcome);