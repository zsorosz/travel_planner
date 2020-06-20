import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import jwt_decode from 'jwt-decode';
import './App.css';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Welcome from './Welcome';
import Profil from './Profil';
import NewPlan from './NewPlan';
import Plan from './Plan';
import EditPlan from './EditPlan';
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
                  render={(props) => (
                    <div className="page">
                      <Profil {...props}/>
                    </div>
                  )} 
                />
                <Route 
                  exact 
                  path="/newPlan" 
                  render={(props) => (
                    <div className="page">
                      <NewPlan {...props}/>
                    </div>
                  )} 
                />
                <Route 
                  exact 
                  path="/:userId/plans/:planId" 
                  render={(routeProps) => (
                    <div className="page">
                      <Plan {...routeProps}/>
                    </div>
                  )} 
                />
                <Route 
                  exact 
                  path="/:userId/plans/:planId/edit" 
                  render={(props) => (
                    <div className="page">
                      <EditPlan {...props}/>
                    </div>
                  )} 
                />
                <Route 
                  exact
                  path="/"
                  render={(props) => (
                    <div className="page">
                      <Welcome {...props}/>
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
