import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import history from './history';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import { getProfile } from './UserFunctions';

class Profil extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      id: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      username: decoded.username,
      email: decoded.email,
      id: decoded._id
    });
  }

handleLogout(){
    history.push("/");
    window.localStorage.clear()
}

  render() {
    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h4">Hi, {this.state.username}!
            </Typography>
            <table>
                <tbody>
                <tr>
                    <td>Username</td>
                    <td>{this.state.username}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{this.state.email}</td>
                </tr>
                <tr>
                    <td>UserID</td>
                    <td>{this.state.id}</td>
                </tr>
                </tbody>
            </table>
            <Button 
                fullWidth
                variant="contained"
                color="secondary"
                onClick={this.handleLogout}>
                    Log out
            </Button>
        </Container>
    )
  }
}

export default Profil;