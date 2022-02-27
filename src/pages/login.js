import React from "react";
import { Container } from "@mui/material";
import { GoogleLogin } from 'react-google-login';
import {Link} from 'react-router-dom';

class Login extends React.Component {
  
  // responseGoogle = (res) => {
  //   console.log(res);
  //   this.checkThatUserExists(res.profileObj.email)
  // }

  // checkThatUserExists = (email) => {
  //   API.getUserByEmail(email)
  //         .then(userRecord => {
  //           if (userRecord.data.length !== 0) {
  //             sessionStorage.setItem("uid", userRecord.data[0]._id);
  //             sessionStorage.setItem("profilePic", userRecord.data[0].profilePic);
  //             window.location.href = "http://localhost:3000/home"
  //           }else {
  //           alert("You need to create an account")
  //           }  
  //         }
  //         )
  //         .catch(err => console.log(err));
  // }

    render() {
      return (
        <Container fixed>
            <div>
            <GoogleLogin
              clientId={"792566538227-34habele94b9rgbto2ots35t8mcebklp.apps.googleusercontent.com"}
              buttonText="Log in with Google"
              onSuccess={this.props.responseGoogle}
              onFailure={this.props.responseGoogle}
              cookiePolicy={'single_host_origin'} />
            </div>
            <div>
              <Link to="/home"> Go to Home Page</Link>
            </div>
        </Container>
      );
    }
  }

export default Login;