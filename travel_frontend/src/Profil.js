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
import CardMedia from '@material-ui/core/CardMedia';
import { getAllPlans } from './PlanFunctions';
import './styles/Profil.css';

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
    }); 
    this.showPlans(decoded._id);
};
// TODO: 
showPlans(id){
    getAllPlans(id).then(plans => {
        this.setState({plans: plans});
        // console.log(this.state.plans);
        
    })
    .catch(err => {
    // console.log(err)
    })
}

handleLogout(){
    history.push("/");
    window.localStorage.clear()
}

render() {
    return (
        <Container component="main" maxWidth="xl" className='profil-container'>
            <div className='profil-header'>
                <Typography component="h6" variant="h6" className='profil-headline'>Hi, {this.state.username}!
                </Typography>
                <Button 
                    className='profil-button profil-logout'
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={this.handleLogout}>
                        Log out
                </Button>
            </div>
            <Link to={`/${this.state.id}/newPlan`} className='link profil-link-newPlan'>
                <Button 
                    className='profil-button profil-newPlan-button'
                    variant="contained"
                    size='small'
                    color="primary">
                        Create a new Plan
                </Button>
            </Link>
            <Typography variant="h6" component="h6" className='profil-text'>Your Plans:</Typography>
            <div className='profil-main'>
                {this.state.plans.map(plan => (
                    <Card className='profil-card' key={plan._id}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`https://source.unsplash.com/1600x900/?${plan.route.arrivalCity}`}
                            title={plan.title}
                        />
                        <CardContent>
                            <Typography variant="h6" component="h6">
                                {plan.title}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                From {plan.route.departureCity} to {plan.route.arrivalCity}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Link to={{ pathname: `/${this.state.id}/plans/${plan._id}`, userId: this.state.id }} onClick={e => e.stopPropagation()} className='link'>
                                <Button 
                                    size="small" 
                                    color="primary">
                                        Open Plan
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </Container>
    )
  }
}

export default Profil;