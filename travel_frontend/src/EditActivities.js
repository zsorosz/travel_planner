import React, { Component } from 'react';
import history from './history';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { updateActivities, showPlan } from './PlanFunctions';
import './styles/FormStyles.css';

class EditActivities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            activities: [],
            userId: this.props.match.params.userId,
            planId: this.props.match.params.planId,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };

    componentDidMount () {
        this.showPlanDetails(this.state.userId, this.state.planId);
    }

    // //TODO: 
    showPlanDetails(userId, planId){
        showPlan(userId, planId).then(plan => {
            this.setState({
                plan: plan,
                activities: plan.route.activities,
                loading: false});
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    };
    
    onSubmit(e) {
        e.preventDefault();
    
        const updatedPlan = {
            activities: this.state.activities
        }

        updateActivities(this.state.userId, this.state.planId, updatedPlan).then(res => {
            // console.log('Success', res);
            history.push(`/${this.state.userId}/plans/${this.state.planId}`)
        });
    };
    handleCancel(){
        history.push(`/${this.state.userId}/plans/${this.state.planId}`);
    }
    render() {
        if(this.state.loading){
            return (<h3>Loading...</h3>)
        }
        return (
            <Container component="main" maxWidth="xs" className='form-container'>
                <Typography component="h1" variant="h5">
                    Edit Activities
                </Typography>
                <form noValidate onSubmit={this.onSubmit}>
                    <TextField
                        margin="normal"
                        name="activities"
                        variant="outlined"
                        fullWidth
                        id="activities"
                        label="Activity"
                        autoFocus
                        value={this.state.activities}
                        onChange={this.onChange}
                    />
                    <div className='editForm-cta'>
                        <Button
                            type="submit"
                            className='editForm-cta-button'
                            variant="contained"
                            color="secondary"
                        >
                            Save
                        </Button>
                        <Button 
                            variant="contained"
                            className='editForm-cta-button'
                            color="primary"
                            onClick={this.handleCancel}>
                                Cancel
                        </Button>
                    </div>
                </form>
            </Container>
        )
    }
};

export default EditActivities;