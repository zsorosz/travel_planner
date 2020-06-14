import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    render(){
        return(
            <div>
                <h1>Welcome to the Travel Planner</h1>
                <Link to="/register">Sign Up</Link>
                <Link to="/login">Log In</Link>
            </div>
        )
    }
};
export default Welcome;