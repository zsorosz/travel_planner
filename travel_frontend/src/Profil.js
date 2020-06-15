import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { getProfile } from './UserFunctions';

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

  render() {
    return (
        <div>
            <h1>PROFILE</h1>
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
        </div>
    )
  }
}

export default Profil;