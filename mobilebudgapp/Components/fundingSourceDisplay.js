import React, { Component } from "react";
import { View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import { black } from "ansi-colors";
import style from "../Styles/Styles";

class FundingSourceDisplay  extends Component {
  state = {
    selected: false,
    bgColor: 'white',
  }

changeColor = () => {
  if (this.state.bgColor === 'white' && !this.state.selected) {
    this.setState({
      bgColor: '#F65050',
      selected: true
    });
  } else {
    this.setState({
      bgColor: 'white',
      selected: false
    });
  }
}


  render (){
      return (
          <Content padder>
              <View onTouchEnd={this.changeColor} style={{ borderStyle: 'solid', borderColor: 'black', borderWidth: 1, borderRadius: 15, width: '50%', backgroundColor: this.state.bgColor}}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ flex: 1, alignSelf: 'center', paddingLeft: 5, paddingTop: 5, paddingBottom: 5 }}> 
                    <Text style={{fontSize: 18 }}> {this.props.incomeName} </Text>
                  </View>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5 }}> 
                    <Text style={{fontSize: 18 }}> ${this.props.incomeAmount} </Text>
                  </View>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                  <View style={{ flex: 1, paddingTop: 1, paddingBottom: 5, paddingLeft: 5,}}> 
                    <Text style={{fontSize: 12 }}> Date: {this.props.incomeDate} </Text>
                  </View>
                </View>
              </View>
          </Content>
      );
    }
  }

  export default FundingSourceDisplay;