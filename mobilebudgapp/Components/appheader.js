import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import style from "../Styles/Styles";

const backgroundImage = require('../Styles/images/turquise indigo gradient.png');

class AppHeader extends Component {
  render() {
    return (
      <Container style={{ minHeight: 70 }}>
          <Header style={ style.header }>
            <ImageBackground source={backgroundImage} style={{width: '100%', height: '100%'}}>
              <Left/>
              <Body>
                <Title>Lahri</Title>
              </Body>
              {/* <Right /> */}
            </ImageBackground>
          </Header>

      </Container>
    );
  }
}

export default AppHeader