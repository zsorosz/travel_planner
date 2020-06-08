import React, { Component } from 'react';
const APIURL = '/api/users';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        this.loadUsers();
    }

    loadUsers(){
        fetch(APIURL)
        .then(resp => {
            if(!resp.ok){
                if(resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = {errorMessage: data.message};
                        throw err;
                    })
                } else {
                    let err = {errorMessage: 'Please try again later'};
                    throw err;
                }
            }
            return resp.json();
        }) .then(users => this.setState({users}));
    }

    render(){
        return(
            <div>
                <h1>Sign Up</h1>
                <div>
                    <form action="/api/users" method="POST">
                        <div>
                            <input type="email" name="email" placeholder="Email" />
                        </div>
                        <div>
                            <input type="text" name="name" placeholder="Username" />
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="Password" />
                        </div>
                        <div>
                            <input type="submit" value="Sign Up" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
};

export default SignUp;