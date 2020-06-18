import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import history from './history';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getAllPlans } from './PlanFunctions';

class Profil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      id: '',
      plans: [],
      errors: {},
      test: 'test'
    }
    this.showPlans = this.showPlans.bind(this);
  }

componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    
    this.setState({
      username: decoded.username,
      email: decoded.email,
      id: decoded._id
    //   plans: decoded.plans
    }); 
    this.showPlans(decoded._id);
};
//TODO: 
showPlans(id){
    getAllPlans(id).then(plans => {
        this.setState({plans: plans})
    })
    .catch(err => {
    console.log(err)
    })
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
            {/* <div>{this.state.plans}</div> */}
            <ul>
                {this.state.plans.map(plan => (
                    <li>{plan._id}</li>
                ))}
            </ul>
            <Button 
                fullWidth
                variant="contained"
                color="secondary"
                onClick={this.handleLogout}>
                    Log out
            </Button>
            <Link to={{ pathname: '/newPlan', userId: this.state.id}}>Create a new Plan</Link>
        </Container>
    )
  }
}

export default Profil;