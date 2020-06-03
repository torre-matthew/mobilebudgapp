import React, { Component } from 'react';
import { ImageBackground, Image, Text } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View } from 'native-base';
import style from "../Styles/Styles";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const backgroundImage = require('../Styles/images/turquise indigo gradient.png');

class AppHeader extends Component {

  state = {
    loggedInUserImage: ""
  }

  componentDidMount() {
  }
  render() {
    return (
      <Container style={{ minHeight: '8%', maxHeight: '8%', backgroundColor: 'transparent'}}>
        <View>
              <View style={{flex:1, alignSelf: 'stretch', flexDirection: 'row', marginTop: '7%'}}>
                <View style={{flex: 1, alignSelf: 'center', paddingLeft: 12, flexGrow: 5}}>
                  <Text style={{fontSize: 25, color: "#40DBCE", fontFamily: 'Laila-SemiBold'}}> Lahri </Text>
                </View>
                <View
                  onTouchEnd={() => {this.props.navigation.navigate('Settings', {photoURL: this.props.photoURL, signOut: this.props.signOut})}} 
                  style={{flex:1, alignSelf: 'center'}}>
                  <MaterialIcons name="settings" size={24} color="#40DBCE" />
                </View>
              </View>
            </View>
       </Container>
    );
  }
}

export default AppHeader