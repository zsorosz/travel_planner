import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Welcome from './Welcome';
import Profil from './Profil';

function App() {
  return (
    <Route render={({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames='page' timeout={500}>
          <Switch location={location}>
            <Route 
              exact 
              path="/api/users/signup" 
              render={(routeProps) => (
                <div className="page">
                  <SignUp />
                </div>
              )} 
            />
            <Route 
              exact 
              path="/api/users/login" 
              render={(routeProps) => (
                <div className="page">
                  <LogIn />
                </div>
              )} 
            />
            <Route 
              exact 
              path="/api/profil" 
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
  );
}

export default App;
