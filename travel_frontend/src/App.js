import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
    console.log(window.localStorage.usertoken);
    
    return (
      <Router history={history}>
        <Route render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} className='page' timeout={500}>
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
                  render={(props) => {
                    if(window.localStorage.usertoken){
                      return (
                        <div className="page">
                          <Profil {...props}/>
                        </div>)
                    } else {
                      return (
                        <div className="page">
                          <Redirect to='/' />
                        </div>)
                    }
                  }} 
                />
                <Route 
                  exact 
                  path="/newPlan"
                  render={(props) => {
                    if(window.localStorage.usertoken){
                      return (
                        <div className="page">
                          <NewPlan {...props}/>
                        </div>)
                    } else {
                      return (
                        <div className="page">
                          <Redirect to='/' />
                        </div>)
                    }
                  }}  
                />
                <Route 
                  exact 
                  path="/:userId/plans/:planId" 
                  render={(routeProps) => {
                    if(window.localStorage.usertoken){
                      return (
                        <div className="page">
                          <Plan {...routeProps}/>
                        </div>)
                    } else {
                      return (
                        <div className="page">
                          <Redirect to='/' />
                        </div>)
                    }
                  }}
                />
                <Route 
                  exact 
                  path="/:userId/plans/:planId/edit" 
                  render={(props) => {
                    if(window.localStorage.usertoken){
                      return (
                        <div className="page">
                          <EditPlan {...props}/>
                        </div>)
                    } else {
                      return (
                        <div className="page">
                          <Redirect to='/' />
                        </div>)
                    }
                  }}
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
