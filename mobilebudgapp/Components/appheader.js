import React, { Component } from 'react';
import { ImageBackground, Image } from 'react-native';
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
      <Container style={{ minHeight: 56, backgroundColor: 'white'}}>
          <Header style={ style.header }>
            <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%'}}>
              <Left/>
              <Body style={{flex:1,flexDirection: 'row' }}>
                <View style={{flex: 1, alignSelf: 'stretch', flexGrow: 7,}}>
                  <Title style={{fontSize: 25}}> Lahri </Title>
                </View>
                <View style={{flex:1, alignSelf: 'flex-end', flexGrow: 2}}>
                  <Image style={{width: 50, height: 50, borderRadius: 10, borderWidth: 1}} source={{uri: this.props.photoURL}} />
                </View>
              </Body>
            </ImageBackground>
          </Header>

      </Container>
    );
  }
}

export default AppHeader