import React, { Component } from 'react';
import { ImageBackground, Image, Text } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View } from 'native-base';
import style from "../Styles/Styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../Styles/images/whiteWall.png');

class AppFooter extends Component {

  state = {
    loggedInUserImage: ""
  }

  componentDidMount() {
  }
  render() {
    return (
      <Container style={{ minHeight: '7%', maxHeight: '7%'}}>
        <View>
          <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%'}}>
              <View style={{flex:1, alignSelf: 'stretch', flexDirection: 'row'}}>
                <View style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
                <FontAwesome5 name="balance-scale" size={28} color="#40DBCE" />
                <Text style={{fontSize: 12, color: "#4A0784", fontFamily: 'Laila-SemiBold'}}> Budget </Text>
                </View>
                <View style={{flex:1, alignItems: 'center', alignSelf: 'center'}}>
                  <FontAwesome5 name="list-alt" size={28} color="#40DBCE" />
                  <Text style={{fontSize: 12, color: "#4A0784", fontFamily: 'Laila-SemiBold'}}> Transactions</Text>
                </View>
              </View>
              </ImageBackground>
            </View>
       </Container>
    );
  }
}

export default AppFooter