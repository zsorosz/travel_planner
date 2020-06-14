import React, { Component } from 'react';
const APIURL = '/api/users/signup/profil';

class Profil extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
    }

    componentDidMount(){
        this.loadUser();
        console.log(this.state.user)
    }

    loadUser(){
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
        }) .then(user => this.setState({user}));
    }

    render(){
        return(
            <div>
                <h1>Welcome to your Profil</h1>
            </div>
        )
    }
}

export default Profil;