import React, { Component } from 'react';
import { ImageBackground, Image, Text } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View } from 'native-base';
import style from "../Styles/Styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../Styles/images/whiteWall.png');

class AppHeader extends Component {

  state = {
    loggedInUserImage: ""
  }

  componentDidMount() {
  }
  render() {
    return (
      <Container style={{ minHeight: '8%', maxHeight: '8%'}}>
        <View>
          <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%'}}>
              <View style={{flex:1, alignSelf: 'stretch', flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'flex-end', alignSelf: 'center', paddingLeft: 12, flexGrow: 5}}>
                  <Text style={{fontSize: 25, color: "#40DBCE", fontFamily: 'Laila-SemiBold'}}> Lahri </Text>
                </View>
                <View style={{flex: 1, alignSelf: 'center', paddingLeft: 12, flexGrow: 5}}>
                  <Ionicons name="ios-add-circle" size={50} color="#40DBCE" />
                </View>
                <View
                  onTouchEnd={() => {this.props.navigation.navigate('Settings', {photoURL: this.props.photoURL, signOut: this.props.signOut})}} 
                  style={{flex:1, alignSelf: 'center'}}>
                  <MaterialIcons name="settings" size={20} color="#40DBCE" />
                </View>
              </View>
              </ImageBackground>
            </View>
       </Container>
    );
  }
}

export default AppHeader