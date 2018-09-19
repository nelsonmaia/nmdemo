import React from "react";

class Controller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          userProfile : {} 
        };
      }

    render(){
        return localStorage.getItem('auth_error');
    }

}

export default Controller;