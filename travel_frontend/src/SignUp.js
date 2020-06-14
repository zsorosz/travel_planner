import React, { Component } from 'react';
import history from './history';
import { register } from './UserFunctions';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          username: '',
          email: '',
          password: '',
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    };
    
    onSubmit(e) {
        e.preventDefault()
    
        const newUser = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
    
        register(newUser).then(res => {
            console.log('Success');
            history.push("/profil")
        })
    };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Register</h1>
                <div>
                <label htmlFor="name">Username</label>
                <input
                      type="text"
                      name="username"
                      placeholder="Enter a Username"
                      value={this.state.username}
                      onChange={this.onChange}
                />
                </div>
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
                    className="btn btn-lg btn-primary btn-block"
                >
                    Register!
                </button>
            </form>
        )
    }
};

export default SignUp;