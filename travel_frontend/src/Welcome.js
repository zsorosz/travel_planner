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
                <Container component="main" maxWidth="xl" className='container'>
                    <Typography component="h1" variant="h2" className='text text-title'>Welcome to the Travel Planner
                    </Typography>
                    <div className='cta'>
                        <Link to="/register" className='link link-signup'>
                            <Button 
                                className='welcome-button button-signup'
                                variant="contained"
                                color="primary">
                                    Sign up
                            </Button>
                        </Link>
                        <Link to="/login" className='link link-login'>
                            <Button 
                                className='welcome-button button-login'
                                variant="contained"
                                color="secondary">
                                    Log in       
                            </Button>
                        </Link>
                    </div>
                </Container>
            )
        }
    }
};
export default Welcome;