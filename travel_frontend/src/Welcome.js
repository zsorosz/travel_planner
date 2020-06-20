import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './styles/Welcome.css';


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
                <Container component="main" className='container'>
                    <Typography component="h1" variant="h2" className='text text-title'>Welcome to the Travel Planner
                    </Typography>
                    <div className='cta'>
                        <Button 
                            className='button-signup'
                            variant="contained"
                            color="primary">
                                <Link to="/register" className='link link-signup'>Sign up</Link>
                        </Button>
                        <Button 
                            className='button-login'
                            variant="contained"
                            color="secondary"
                            onClick="/login">
                                <Link to="/login" className='link link-login'>Log in</Link>
                        </Button>
                    </div>
                </Container>
            )
        }
    }
};
export default Welcome;