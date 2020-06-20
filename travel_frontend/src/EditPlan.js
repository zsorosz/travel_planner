import React, { Component } from 'react';
import history from './history';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { updatePlan } from './PlanFunctions';
import './styles/FormStyles.css';

class EditPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            title: '',
            departureCity: '',
            arrivalCity: '',
            travelMethod: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    componentDidMount () {
        this.setState({
            title: this.props.location.plan.title,
            departureCity: this.props.location.plan.route[0].departureCity,
            arrivalCity: this.props.location.plan.route[0].arrivalCity,
            travelMethod: this.props.location.plan.route[0].travelMethod,
            loading: false
          });     
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
            travelMethod: this.state.travelMethod
        }

        updatePlan(this.props.match.params.userId, this.props.match.params.planId, updatedPlan).then(res => {
            console.log('Success', res);
            history.push("/profil")
        });
    };
    render() {
        if(this.state.loading){
            return (<h3>Loading...</h3>)
        }
        return (
            <Container class='form-container'>
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
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="travelMethod"
                        label="Travelling by"
                        id="travelMethod"
                        value={this.state.travelMethod}
                        onChange={this.onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                    >
                        Save
                    </Button>
                </form>
            </Container>
        )
    }
};

export default EditPlan;