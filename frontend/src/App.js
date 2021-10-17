import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from './pages/login';
import BeersPage from './pages/beers';
import Register from './pages/register'

export default function App() {


  return (
    <Router>
      <Switch basename={`/`}>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/transactions">
          <BeersPage />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>        
      </Switch>
    </Router>
  );
}