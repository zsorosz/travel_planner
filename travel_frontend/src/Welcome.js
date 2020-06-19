import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


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
            return(<Profil state={this.props.state}/>)
        } else {
            return(
                <Container component="main" maxWidth="xs">
                    <Typography component="h1" variant="h5">Welcome to the Travel Planner
                    </Typography>
                    <Button 
                        fullWidth
                        variant="contained"
                        color="primary">
                            <Link to="/register">Sign up</Link>
                    </Button>
                    <Button 
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick="/login">
                            <Link to="/login">Log in</Link>
                    </Button>
                </Container>
            )
        }
    }
};
export default Welcome;