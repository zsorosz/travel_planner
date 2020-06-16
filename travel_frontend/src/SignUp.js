import React, { Component } from 'react';
import history from './history';
import { register, login } from './UserFunctions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import './styles/FormStyles.css';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          username: '',
          email: '',
          password: '',
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    };
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    };
    
    onSubmit(e) {
        e.preventDefault()
    
        const newUser = {
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
        }
    
        register(newUser).then(res => {
            console.log('Success', res);
            history.push("/")
        })

    };
    render() {
        return (
            <Container class='form-container'>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form noValidate onSubmit={this.onSubmit}>
                    <TextField
                        autoComplete="fname"
                        margin="normal"
                        name="username"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
};

export default SignUp;