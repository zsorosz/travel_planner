import React, { Component } from 'react';
import history from './history';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { updateCosts, showPlan } from './PlanFunctions';
import './styles/FormStyles.css';

class EditCosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            travelCosts: 0,
            accomodationCosts: 0,
            otherCosts: 0,
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
                travelCosts: plan.route.travelCosts,
                accomodationCosts: plan.route.accomodationCosts,
                otherCosts: plan.route.otherCosts,
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
            travelCosts: this.state.travelCosts,
            accomodationCosts: this.state.accomodationCosts,
            otherCosts: this.state.otherCosts,
        }

        updateCosts(this.state.userId, this.state.planId, updatedPlan).then(res => {
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
                    Edit Costs
                </Typography>
                <form noValidate onSubmit={this.onSubmit}>
                    <TextField
                        margin="normal"
                        name="travelCosts"
                        variant="outlined"
                        fullWidth
                        id="travelCosts"
                        label="Costs of Transportation"
                        autoFocus
                        value={this.state.travelCosts}
                        onChange={this.onChange}
                    />
                    <TextField
                        margin="normal"
                        name="accomodationCosts"
                        variant="outlined"
                        fullWidth
                        id="accomodationCosts"
                        label="Costs of Accomodation"
                        autoFocus
                        value={this.state.accomodationCosts}
                        onChange={this.onChange}
                    />
                    <TextField
                        margin="normal"
                        name="otherCosts"
                        variant="outlined"
                        fullWidth
                        id="otherCosts"
                        label="Other Costs"
                        autoFocus
                        value={this.state.otherCosts}
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

export default EditCosts;