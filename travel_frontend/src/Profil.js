import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import history from './history';
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
        <div>
            <h1>Hi, {this.state.username}!</h1>
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
            <button onClick={this.handleLogout}>Log out</button>
        </div>
    )
  }
}

export default Profil;