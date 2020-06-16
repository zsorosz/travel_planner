import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Profil from './Profil';

class Welcome extends Component {
    constructor(props){
        super(props);
        const usertoken = window.localStorage.getItem("usertoken");
        this.state = {
            usertoken: usertoken
        }
    };
    render(){
        if(this.state.usertoken){
            return(<Profil />)
        } else {
            return(
                <div>
                    <h1>Welcome to the Travel Planner</h1>
                    <Link to="/register">Sign Up</Link>
                    <Link to="/login">Log In</Link>
                </div>
            )
        }
    }
};
export default Welcome;