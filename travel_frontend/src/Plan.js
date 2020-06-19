import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { showPlan } from './PlanFunctions';

class Plan extends Component{
    constructor(props) {
        super(props)
        this.state = {
          plan: {},
          userId: this.props.location.userId,
          planId: this.props.location.planId,
          errors: {}
        }
        this.showPlan = this.showPlan.bind(this);
      }
    
    componentDidMount() {
        // const userId = this.props.location.userId;
        // const planId = this.props.location.planId;
        // this.setState({ userId: userId, planId: planId });
        this.showPlan(this.state.userId, this.state.planId);
    };
    // //TODO: 
    showPlan(userId, planId){
        showPlan(userId, planId).then(plan => {
            this.setState({plan: plan});
            console.log(this.state.plan);   
        })
        .catch(err => {
        console.log(err)
        })
    }
    render(){
        return(
            <div>
                <Typography variant="h5" component="h4">Your Plan:</Typography>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {this.state.plan.title}
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                {this.state.plan._id}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Edit Plan</Button>
                        </CardActions>
                    </Card>
            </div>
        )
    }
}

export default Plan;