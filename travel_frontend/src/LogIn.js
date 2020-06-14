import React, { Component } from 'react';
import history from './history';
import { login } from './UserFunctions'

class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()
    
        const user = {
          email: this.state.email,
          password: this.state.password
        }
    
        login(user).then(res => {
          if (res) {
            history.push('/profil')
          }
        })
    }
    render(){
        return( 
            <form noValidate onSubmit={this.onSubmit}>
              <h1>Please sign in</h1>
              <div>
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
              >
                Sign in
              </button>
            </form>
        )
    }
}

export default LogIn;