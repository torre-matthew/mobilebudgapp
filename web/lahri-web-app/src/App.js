import React, { Component } from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import LoginPage from './pages/login';
import HomePage from './pages/home';
import TopNav from './components/topNav';

// import Container from '@material-ui/core/Container';

class App extends React.Component {

  render () {
    return (
      <Router>
        <div className="App">
          <TopNav />
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
          </Switch> 
        </div>
      </Router>

    );
  }
}

export default App;
