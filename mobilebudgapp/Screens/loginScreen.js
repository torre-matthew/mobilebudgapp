import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import * as Google from 'expo-google-app-auth'
import LoginScreenStyles from "../Styles/loginSreenStyles";
import style from "../Styles/Styles";
import MainPage from '../Components/mainPage';
import ApiMethods from '../utilities/apiMethods';
import { AppLoading } from 'expo';
import LoadFonts from '../assets/fonts';


const backgroundImage = require('../Styles/images/turquise indigo gradient.png');

class LoginScreen extends Component {

  state = {
    signedIn: false,
    name: "",
    photoUrl: "",
    email:"",
    userID: "",
    accessToken: "",
    showSpinner: true,
    currentMonthID: "",
    currentMonth: "",
    currentYear: "",
    spinnerOpacity: 0, //Because of this bug: https://github.com/facebook/react-native/issues/9023
    fontsLoaded: false
  }

  componentDidMount() {
    LoadFonts().then(fonts => {this.setState({fontsLoaded: true})}).catch(err => console.log(err));
  }

  signIn = async () => {
    this.setState({spinnerOpacity: 1})
    try {
      const result = await Google.logInAsync({
        androidClientId: "446220388364-jffs659t4t98fuur4srsstggq04mgd52.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })
      if (result.type === "success") {
          ApiMethods.getUserByEmail(result.user.email)
          .then(data => {
            if (data.data[0] === undefined){
              ApiMethods.addUser(result.user.email, result.user.photoUrl, result.user.familyName, result.user.givenName)
              .then(data => console.log(data)).catch(err => console.log(err));

              this.setState({
                signedIn: true,
                name: result.user.name,
                photoUrl: result.user.photoUrl,
                email: result.user.email,
                accessToken: result.accessToken
              }, () => {
                ApiMethods.getCurrentMonth()
                      .then(month => {
                          this.setState({
                            currentMonthID: month.data[0]._id,
                            currentMonth: month.data[0].month,
                            currentyear: month.data[0].year,
                            spinnerOpacity: 0
                          });
                        })
                      .catch(err => console.log(err));
              })
            }else {
              this.setState({
                signedIn: true,
                name: result.user.name,
                photoUrl: result.user.photoUrl,
                email: result.user.email, 
                userID: data.data[0]._id,
                accessToken: result.accessToken
              }, () => { //callback in setstate to get data for current calendar month and set month data that will be needed when the app is loaded
                ApiMethods.getCurrentMonth()
                      .then(month => {
                          this.setState({
                            currentMonthID: month.data[0]._id,
                            currentMonth: month.data[0].month,
                            currentYear: month.data[0].year,
                            spinnerOpacity: 0
                          }, () => { //another callback that then sends the user to the main app after the month data has been recieved and set.
                            this.props.navigation.navigate('Budget', {email: this.state.email, userID: this.state.userID, currentMonth: this.state.currentMonth, currentYear: this.state.currentYear, currentMonthID: this.state.currentMonthID, photoURL: this.state.photoUrl, signOut: this.signOut})
                          });
                        })
                      .catch(err => console.log(err))
              })
            }
          })
          .catch(err => console.log(err))

      } else {
        console.log("cancelled")
        this.setState({ 
          showSpinner: false
        })
      }
} catch (e) {
      console.log("error", e)
    }
}

signOut = async () => {

  await Google.logOutAsync({accessToken: this.state.accessToken, androidClientId: "446220388364-jffs659t4t98fuur4srsstggq04mgd52.apps.googleusercontent.com"})
              .then(data => {
                  this.setState({signedIn: false, email: "", name: "", photoUrl: "", accessToken: ""})
                })
              .catch(err => console.log(err));
  
  await this.props.navigation.navigate('Login');

}

 render() {

   const {navigation} = this.props;

   if (!this.state.fontsLoaded) {
      return <AppLoading />;
 } else {
      return (
        <Container style={LoginScreenStyles.container}>
            <ImageBackground
              source={backgroundImage}
              style={{width: '100%', height: '100%'}} >
            <View style={LoginScreenStyles.welcome}>
              <Text style={{color: '#F5F5F5', fontSize: 45, fontFamily: "Laila-SemiBold"}}>
                Hi! I'm Lahri.
              </Text>
              <Text style={{color: '#F5F5F5', fontSize: 15, fontFamily: "Laila-SemiBold"}}>
                I'll help you make a plan for your money.
              </Text>
              <Text style={{color: '#F5F5F5', fontSize: 15, fontFamily: "Laila-SemiBold"}}>
                Shall we get to it?
              </Text>
            </View>
            <View style={LoginScreenStyles.welcome}>
            <View>
            <ActivityIndicator style={{ opacity: this.state.spinnerOpacity }} animating={this.state.showSpinner} size={50} color="#40DBCE" />
            </View>
              {this.state.signedIn ? 
                <Text style={{color: '#F5F5F5', fontSize: 18, fontFamily: "Laila-SemiBold"}}> {'Welcome back, ' + this.state.name} </Text>
              : 
                <Text></Text>
              }
            </View>
            <View style={LoginScreenStyles.signIn}>
            {this.state.signedIn ? 
            <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Budget', {email: this.state.email, currentMonth: this.state.currentMonth, currentYear: this.state.currentYear, currentMonthID: this.state.currentMonthID, photoURL: this.state.photoUrl, signOut: this.signOut})}
              style={style.button2_cta_style} >
              <Text style={{fontFamily: "Laila-SemiBold"}}> Go to main page </Text>
            </TouchableOpacity>
            </View>
              : 
              <View> 
              <TouchableOpacity
                onPress={() => {this.signIn()}}
                style={style.button2_light_style} >
                <Text style={{color: '#4A0784', fontFamily: "Laila-SemiBold"}}> Sign in with Google </Text>
              </TouchableOpacity>
              </View>
              }
            </View>
          </ImageBackground>  
        </Container>
      );
    }
  }
}

  export default LoginScreen;