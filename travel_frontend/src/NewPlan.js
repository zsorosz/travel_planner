import React, { Component } from 'react';
import history from './history';
import { createNewPlan } from './PlanFunctions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './styles/FormStyles.css';

class NewPlan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            departureCity: '',
            arrivalCity: '',
            departureDate: '',
            arrivalDate: '',
            travelMethod: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };
    componentDidMount () {
        const id = this.props.location.userId;   
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    };
    
    onSubmit(e) {
        e.preventDefault();
    
        const newPlan = {
            title: this.state.title,
            departureCity: this.state.departureCity,
            arrivalCity: this.state.arrivalCity,
            departureDate: this.state.departureDate,
            arrivalDate: this.state.arrivalDate
        }

        createNewPlan(newPlan, this.props.match.params.userId).then(res => {
            // console.log('Success', res);
            history.push(`/${this.props.match.params.userId}/plans/${res._id}`)
        });
    };
    handleCancel(){
        history.push('/');
    };
    render() {
        return (
            <Container component="main" maxWidth="xs" className='form-container'>
                <Typography component="h1" variant="h5">
                    Create a New Plan
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
                    <div className='editForm-dates'>
                        <TextField
                            id="departureDate"
                            label="From (date)"
                            type="date"
                            name="departureDate"
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
                            onChange={this.onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        className='editForm-cta-button'
                        color="primary"
                    >
                        Create Plan
                    </Button>
                    <Button 
                        variant="contained"
                        className='editForm-cta-button'
                        color="secondary"
                        onClick={this.handleCancel}>
                            Cancel
                    </Button>
                </form>
            </Container>
        )
    }
};

export default NewPlan;