import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from './pages/login';
import HomePage from './pages/home';
import TopNav from './components/topNav';
import {StyledEngineProvider} from '@mui/material/styles';
import sideBarDrawer from "./components/sideBarDrawer";



class App extends React.Component {



  render () {
    return (
      <StyledEngineProvider injectFirst>
          <Router>
            <div className="App">
              <TopNav />
              <sideBarDrawer />
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/home" component={HomePage} />
              </Switch> 
            </div>
          </Router>
      </StyledEngineProvider>
    );
  }
}

export default App;
