import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Welcome from './Welcome';
import Profil from './Profil';
import history from './history';
import './styles/Page.css';

class App extends Component {
  render(){
    return (
      <Router history={history}>
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames='page' timeout={500}>
              <Switch location={location}>
                <Route 
                  exact 
                  path="/register" 
                  history={this.props.history}
                  render={(routeProps) => (
                    <div className="page">
                      <SignUp />
                    </div>
                  )} 
                />
                <Route 
                  exact 
                  path="/login" 
                  render={(routeProps) => (
                    <div className="page">
                      <LogIn />
                    </div>
                  )} 
                />
                <Route 
                  exact 
                  path="/profil" 
                  render={(routeProps) => (
                    <div className="page">
                      <Profil />
                    </div>
                  )} 
                />
                <Route 
                  render={(routeProps) => (
                    <div className="page">
                      <Welcome />
                    </div>
                  )} 
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </Router>
    );
  }
}

export default App;
