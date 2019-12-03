import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title } from 'native-base';
import style from "../Styles/Styles";

class AppHeader extends Component {
  render() {
    return (
      <Container style={{ minHeight: 70 }}>
        <Header style={ style.header }>
          <Left/>
          <Body>
            <Title>App Name Here</Title>
          </Body>
          {/* <Right /> */}
        </Header>
      </Container>
    );
  }
}

export default AppHeader