import React, { Component } from 'react';
import history from './history';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { updatePlan, showPlan } from './PlanFunctions';
import './styles/FormStyles.css';

class EditPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            plan: '',
            title: '',
            departureCity: '',
            arrivalCity: '',
            travelMethod: '',
            departureDate: '',
            arrivalDate: '',
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
                title: plan.title,
                departureCity: plan.route.departureCity,
                arrivalCity: plan.route.arrivalCity,
                travelMethod: plan.route.travelMethod,
                travelCosts: plan.route.travelCosts,
                departureDate: plan.route.departureDate,
                arrivalDate: plan.route.arrivalDate,
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
            title: this.state.title,
            departureCity: this.state.departureCity,
            arrivalCity: this.state.arrivalCity,
            travelMethod: this.state.travelMethod,
            travelCosts: this.state.travelCosts,
            departureDate: this.state.departureDate,
            arrivalDate: this.state.arrivalDate
        }

        updatePlan(this.state.userId, this.state.planId, updatedPlan).then(res => {
            // console.log('Success', res);
            history.push(`/${this.state.userId}/plans/${this.state.planId}`)
        });
    };
    handleCancel(){
        history.push(`/${this.state.userId}/plans/${this.state.planId}`);
    };
    formatDate(date){
        const d = new Date(date);
        const dformat = [d.getFullYear(), ("0" + (d.getMonth() + 1)).slice(-2), ("0" + d.getDate()).slice(-2)].join('-');
        return dformat;
    }
    render() {
        if(this.state.loading){
            return (<h3>Loading...</h3>)
        }
        return (
            <Container component="main" maxWidth="xs" className='form-container'>
                <Typography component="h1" variant="h5">
                    Edit Plan
                </Typography>
                <form noValidate onSubmit={this.onSubmit}>
                    <TextField
                        margin="normal"
                        name="title"
                        variant="outlined"
                        required
                        fullWidth
                        id="title"
                        label="Give a name to your plan"
                        autoFocus
                        value={this.state.title}
                        onChange={this.onChange}
                    />
                    <TextField
                        margin="normal"
                        name="departureCity"
                        variant="outlined"
                        required
                        fullWidth
                        id="departureCity"
                        label="From"
                        value={this.state.departureCity}
                        onChange={this.onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="arrivalCity"
                        label="To"
                        name="arrivalCity"
                        value={this.state.arrivalCity}
                        onChange={this.onChange}
                    />
                    <FormLabel className='form-label' component="legend">Travel Method</FormLabel>
                    <RadioGroup value={this.state.travelMethod} id="travelMethod" name="travelMethod" aria-label="travelMethod" onChange={this.onChange} className='radiogroup'>
                        <FormControlLabel className='radiolabel' value="Car" control={<Radio />} label="Car" />
                        <FormControlLabel className='radiolabel' value="Airplane" control={<Radio />} label="Airplane" />
                        <FormControlLabel className='radiolabel' value="Train" control={<Radio />} label="Train" />
                        <FormControlLabel className='radiolabel' value="Bus" control={<Radio />} label="Bus" />
                    </RadioGroup>
                    <div className='editForm-dates'>
                        <TextField
                            id="departureDate"
                            label="From (date)"
                            type="date"
                            name="departureDate"
                            defaultValue={this.formatDate(this.state.departureDate)}
                            onChange={this.onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="arrivalDate"
                            label="To (date)"
                            type="date"
                            name="arrivalDate"
                            defaultValue={this.formatDate(this.state.arrivalDate)}
                            onChange={this.onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
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

export default EditPlan;