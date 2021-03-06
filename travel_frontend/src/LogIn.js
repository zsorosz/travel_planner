import React, { Component } from 'react';
import history from './history';
import { login } from './UserFunctions'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import './styles/FormStyles.css';

class LogIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            showError: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value, showError: false })
    }
    onSubmit(e) {
        e.preventDefault()
    
        const user = {
          email: this.state.email,
          password: this.state.password
        }
    
        login(user).then(res => {
          if (!res.error) {
            history.push('/profil')
          } else {
            this.setState({email: '', password: '', showError: true, errorMessage: res.error})
          }
        })
    }
    render(){
        return(
          <Container className='form-container' component="main" maxWidth="xs">
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {this.state.showError && <div className="error-message">{this.state.errorMessage}</div>}
            <form noValidate onSubmit={this.onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                Sign In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/register" variant="body2">
                    You don't have an account yet? Sign up here
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Container>
        )
    }
}

export default LogIn;