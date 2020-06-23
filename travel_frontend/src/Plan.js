import React, { Component } from 'react';
import history from './history';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { showPlan, deletePlan } from './PlanFunctions';
import './styles/Plan.css';

class Plan extends Component{
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            plan: '',
            arrivalCity: '',
            userId: this.props.match.params.userId,
            planId: this.props.match.params.planId,
            errors: {}
        }
        this.showPlanDetails = this.showPlanDetails.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }
    
    componentDidMount() {
        this.showPlanDetails(this.state.userId, this.state.planId);
    };
    // //TODO: 
    showPlanDetails(userId, planId){
        showPlan(userId, planId).then(plan => {
            this.setState({plan: plan, loading: false});
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleDelete(){
        deletePlan(this.props.match.params.userId, this.props.match.params.planId).then(() => {
            history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        if(this.state.loading){
            return (<h3>Loading...</h3>)
        }
        return(
            <Container component="main" maxWidth="xl" className='plan-container'>
                <Typography variant="h4" component="h4">
                    {this.state.plan.title}
                </Typography>
                <div className='plan-cta'>
                    <Link to='/profil' onClick={e => e.stopPropagation()} className='link'>
                        <Button 
                            className='link-button link-button-back'
                            size="small"
                            >
                                Back
                        </Button>
                    </Link>
                    <Link to={{ pathname: `/${this.state.userId}/plans/${this.state.planId}/edit`, plan: this.state.plan }} onClick={e => e.stopPropagation()} className='link'>
                        <Button 
                            className='link-button link-button-edit'
                            size="small"
                            >
                                Edit Plan
                        </Button>
                    </Link>
                    <Button 
                        className='link-button link-button-delete'
                        onClick={this.handleDelete}
                        size="small"
                        >
                            Delete Plan
                    </Button>
                </div>
                <Card className='plan-card'>
                    <CardContent>
                        <Typography variant="h6" component="h6">
                            From: {this.state.plan.route.departureCity}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            To: {this.state.plan.route.arrivalCity}
                        </Typography>
                        <Typography variant="h6" component="h6">
                            Travel by: {this.state.plan.route.travelMethod}
                        </Typography>
                    </CardContent>
                    <CardActions>     
                        <Link to={{ pathname: `/${this.state.userId}/plans/${this.state.planId}/edit`, plan: this.state.plan }} onClick={e => e.stopPropagation()} className='link'>
                            <Button 
                                size="small"
                                color='primary'>
                                    Edit Route
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Container>
        )
    }
}

export default Plan;