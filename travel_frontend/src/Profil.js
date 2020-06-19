import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import history from './history';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
// TODO: 
showPlans(id){
    getAllPlans(id).then(plans => {
        this.setState({plans: plans});
        console.log(this.state.plans);
        
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
            <Button 
                fullWidth
                variant="contained"
                color="secondary"
                onClick={this.handleLogout}>
                    Log out
            </Button>
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
            <div>
                <Typography variant="h5" component="h4">Your Plans:</Typography>
                {this.state.plans.map(plan => (
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {plan.title}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                {plan._id}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={{ pathname: `/${this.state.id}/plans/${plan._id}`, userId: this.state.id }} onClick={e => e.stopPropagation()}>Open Plan</Link>
                        </CardActions>
                    </Card>
                ))}
            </div>
            <Link to={{ pathname: '/newPlan', userId: this.state.id}}>
                <Button 
                    variant="contained"
                    color="primary">
                        Create a new Plan
                </Button>
            </Link>
        </Container>
    )
  }
}

export default Profil;