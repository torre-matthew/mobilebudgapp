import React, { Component } from 'react';
import { ImageBackground, Image, Text } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View } from 'native-base';
import style from "../Styles/Styles";

const backgroundImage = require('../Styles/images/turquise indigo gradient.png');

class AppHeader extends Component {

  state = {
    loggedInUserImage: ""
  }

  componentDidMount() {
  }
  render() {
    return (
      <Container style={{ minHeight: 56}}>
        <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%'}}>
          <Header style={ style.header }>
              <Body style={{flex:1, flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'flex-end', alignSelf: 'center', flexGrow: 7}}>
                  <Text style={{fontSize: 25, fontWeight: 'bold', color: '#F5F5F5'}}> Lahri </Text>
                </View>
                <View
                  onTouchEnd={() => {this.props.navigation.navigate('Settings', {photoURL: this.props.photoURL, signOut: this.props.signOut})}} 
                  style={{flex:1, alignSelf: 'center', flexGrow: 2}}>
                  <Text style={{color: '#F5F5F5', fontSize: 12, fontWeight: 'bold'}}> Settings </Text>
                </View>
              </Body>
            </Header>
          </ImageBackground>
       </Container>
    );
  }
}

export default AppHeader