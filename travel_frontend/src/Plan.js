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
        deletePlan(this.state.userId, this.state.planId).then(() => {
            history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }
    formatDate(date){
        const d = new Date(date);
        const dformat = [d.getDate(),
                        (d.getMonth()+1),
                        d.getFullYear()].join('/');
        return dformat;
    };
    
    render(){
        if(this.state.loading){
            return (<h3>Loading...</h3>)
        }
        const { userId, planId, plan } = this.state;
        const { title } = this.state.plan;
        const { departureCity, arrivalCity, departureDate, arrivalDate, travelMethod, travelCosts, accomodationCosts, otherCosts, activities } = this.state.plan.route;
        return(
            <Container component="main" maxWidth="xl" className='plan-container'>
                <Typography variant="h4" component="h4">
                    {title}
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
                    <Link to={{ pathname: `/${userId}/plans/${planId}/edit`, plan: plan }} onClick={e => e.stopPropagation()} className='link'>
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
                <main className='main'>
                <Card className='plan-card'>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            From: {departureCity} ------ To: {arrivalCity}
                        </Typography>
                        {departureDate &&
                        <Typography color="textSecondary" gutterBottom>
                            Date: {this.formatDate(departureDate)}  -  {this.formatDate(arrivalDate)}
                        </Typography>}
                        <Typography color="textSecondary" gutterBottom>
                            Travel by: {travelMethod}
                        </Typography>
                    </CardContent>
                    <CardActions>     
                        <Link to={{ pathname: `/${userId}/plans/${planId}/edit`, plan: plan }} onClick={e => e.stopPropagation()} className='link'>
                            <Button 
                                size="small"
                                color='primary'>
                                    Edit Route
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
                <Card className='cost-card'>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Travel Costs
                        </Typography>
                        {travelCosts &&
                        <Typography color="textSecondary" gutterBottom>
                            Transportation: {travelCosts} €
                        </Typography>}
                        {accomodationCosts &&
                        <Typography color="textSecondary" gutterBottom>
                            Accomodation: {accomodationCosts} €
                        </Typography>}
                        {otherCosts &&
                        <Typography color="textSecondary" gutterBottom>
                            Other Costs: {otherCosts} €
                        </Typography>}
                        <hr className='divider' />
                        {(travelCosts || accomodationCosts || otherCosts) &&
                        <Typography variant="h6" gutterBottom>
                            Total Costs: {otherCosts + travelCosts + accomodationCosts} €
                        </Typography>}
                    </CardContent>
                    <CardActions>     
                        <Link to={{ pathname: `/${userId}/plans/${planId}/editCosts`, plan: plan }} onClick={e => e.stopPropagation()} className='link'>
                            <Button 
                                size="small"
                                color='primary'>
                                    Edit Costs
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
                <Card className='cost-card'>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Activities in {arrivalCity}
                        </Typography>
                        {activities.map(el => (
                            <li>
                                {el}
                            </li>
                        ))}
                    </CardContent>
                    <CardActions>     
                        <Link to={{ pathname: `/${userId}/plans/${planId}/editActivities`, plan: plan }} onClick={e => e.stopPropagation()} className='link'>
                            <Button 
                                size="small"
                                color='primary'>
                                    Add Activities
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
                </main>
            </Container>
        )
    }
}

export default Plan;