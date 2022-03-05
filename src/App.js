import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginPage from './pages/login';
import HomePage from './pages/home';
import TopNav from './components/topNav';
import {StyledEngineProvider} from '@mui/material/styles';
import API from './utilities/apiMethods';



class App extends React.Component {

  state = {
    profilePic: ""
  }

  responseGoogle = (res) => {
    console.log(res);
    this.checkThatUserExists(res.profileObj.email)
  }
  
  logOut = () => {
    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("profilePic");
    this.setState({profilePic: ""});
  }

  checkThatUserExists = (email) => {
    API.getUserByEmail(email)
          .then(userRecord => {
            if (userRecord.data.length !== 0) {
              sessionStorage.setItem("uid", userRecord.data[0]._id);
              sessionStorage.setItem("profilePic", userRecord.data[0].profilePic);
              this.setState({profilePic: userRecord.data[0].profilePic});
            }else {
            alert("You need to create an account")
            }  
          }
          )
          .catch(err => console.log(err));
  }

  render () {
    return (
      <StyledEngineProvider injectFirst>
          <Router>
            <div className="App">
              <TopNav 
                profilePic={this.state.profilePic}
                logOut={this.logOut} />
              <Switch>
                <Route exact path="/" render={(props) => <LoginPage {...props} 
                                        responseGoogle={this.responseGoogle} />} 
                />
                <Route 
                  exact path="/login" 
                  render={(props) => <LoginPage {...props} 
                                        responseGoogle={this.responseGoogle} />} 
                />
                <Route exact path="/home" component={HomePage} />
              </Switch> 
            </div>
          </Router>
      </StyledEngineProvider>
    );
  }
}

export default App;
