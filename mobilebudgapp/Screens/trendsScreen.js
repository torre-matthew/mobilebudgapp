import React, { Component } from "react";
import { ActivityIndicator, View, Button, ImageBackground, Alert, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { TouchableOpacity } from 'react-native-gesture-handler';
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import BackGroundImage from "../Styles/images/app background 3.png";
import AppFooter from '../Components/appfooter';
import AppHeader from '../Components/appheader';
import CatBreakdownWrapper from '../Components/Trends/catBreakdownWrapper';
class TrendsScreen extends Component {

  state = {
    threeMonthAveragePerMonth: "",
    sixMonthAveragePerMonth: ""
  }

  componentDidMount() {
    this.getAverages(this.props.route.params.currentUserID);
  }

  getAverages = (userID) => {
    ApiMethods.getAveragePlannedItemsTotalForLastThreeMonths(userID)
              .then(threeMonthAverage => {
                this.setState({
                  threeMonthAveragePerMonth: threeMonthAverage.data
                })
              })
              .catch(err => console.log(err))

    ApiMethods.getAveragePlannedItemsTotalForLastSixMonths(userID)
    .then(sixMonthAverage => {
      this.setState({
        sixMonthAveragePerMonth: sixMonthAverage.data
      })
    })
    .catch(err => console.log(err))              
  }

 render() {

   const {navigation} = this.props;

    return (
      <Container>
        <ImageBackground
            source={BackGroundImage}
            style={{width: '100%', height: '100%'}} >
        <AppHeader 
            photoURL={this.state.photoUrl}
            navigation={this.props.navigation}
            signOut={this.props.signOut} /> 
          <CatBreakdownWrapper
            threeMonthAveragePerMonth={this.state.threeMonthAveragePerMonth}
            sixMonthAveragePerMonth={this.state.sixMonthAveragePerMonth} 
          />
          <AppFooter 
              navigation={this.props.navigation}
              screen={"trends"} />
        </ImageBackground> 
      </Container>
      
    );
  }
}

  export default TrendsScreen;