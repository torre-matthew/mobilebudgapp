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

  // #2D2D2F - Charcoal
  // #4658A1 - blue
  render() {
    return (
      <Container style={{ minHeight: '8%', maxHeight: '8%', backgroundColor: '#448EB3'}}>
        <View>
          {/* <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%'}}> */}
              <View style={{flex:1, flexDirection: 'row', margin: 8}}>
                <View onTouchEnd={() => this.props.navigation.navigate('Main')} style={{flex: 1, alignItems: 'center'}}>
                <FontAwesome5 name="balance-scale" size={22} color="#F5F5F5" />
                <Text style={{fontSize: 12, color: "#F5F5F5", fontFamily: 'Laila-SemiBold'}}> Budget </Text>
                </View>
                <View onTouchEnd={() => this.props.navigation.navigate('Transactions')} style={{flex:1, alignItems: 'center'}}>
                  <FontAwesome5 name="list-alt" size={22} color="#F5F5F5" />
                  <Text style={{fontSize: 12, color: "#F5F5F5", fontFamily: 'Laila-SemiBold'}}> Spending </Text>
                </View>
                <View onTouchEnd={() => this.props.navigation.navigate('Bill Pay')} style={{flex:1, alignItems: 'center'}}>
                  <FontAwesome5 name="file-invoice" size={22} color="#F5F5F5" />
                  <Text style={{fontSize: 12, color: "#F5F5F5", fontFamily: 'Laila-SemiBold'}}> Pay Bills </Text>
                </View>
                <View onTouchEnd={() => this.props.navigation.navigate('Trends')} style={{flex:1, alignItems: 'center'}}>
                  <FontAwesome5 name="chart-line" size={22} color="#F5F5F5" />
                  <Text style={{fontSize: 12, color: "#F5F5F5", fontFamily: 'Laila-SemiBold'}}> Trends </Text>
                </View>
              </View>
              {/* </ImageBackground> */}
            </View>
       </Container>
    );
  }
}

export default AppFooter