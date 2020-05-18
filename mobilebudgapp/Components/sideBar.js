import React, { Component} from "react";
import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native';
import UnplannedBillDisplay from './billDisplay';
import { Container, Header, Content, Card, CardItem, Text, Body } from "native-base";
import AddBillModal from "./addBillModal";
import EmptyStateDisplay from "./unplannedBillWrapperEmptyState";
import MainPage from '../Components/mainPage';
import style from "../Styles/Styles";

const sbStyle = StyleSheet.create({

container_visible: {
  minHeight: '100%',
  maxHeight: '100%',
  width: '75%',
  backgroundColor: '#4A0784',
  marginTop: '6%',
  zIndex: 6,
  position: 'absolute',
  opacity: 1
},
container_hide: {
  minHeight: '0%',
  maxHeight: '0%',
  width: '0%',
  backgroundColor: '#4A0784',
  marginTop: '0%',
  zIndex: -1,
  position: 'absolute',
  opacity: 0
}

})

class SideBar extends Component {

  state = {
    visible: "",
    sideBarStyle: true
  }

  showSideBar = (visible) => {
    
      if (visible) {
      this.setState({
        visible: true,
        sideBarStyle: sbStyle.container_visible
      })
    } else {
      this.setState({
        visible: false,
        sideBarStyle: sbStyle.container_hide
      })
    }
  }

  componentDidMount() {
    this.showSideBar(false);
  }

  // componentDidUpdate() {
  //   this.showSideBar(this.props.showSideBar);
  // }

  render(){
      return (
      <View>
        {/* <MainPage 
          loggedInUsersEmail={this.props.email}
          currentMonth={this.props.currentMonth}
          currentMonthID={this.props.currentMonthID}
          navigation={this.props.navigation}
          photoURL={this.props.photoURL}
          /> */}
        <View style={{zIndex: 6, opacity: 1, width: '50%', minHeight: '100%', maxHeight: '100%', left: 120}}>
          <TouchableOpacity
            onPress={() => {this.showSideBar(true)}}
            style={style.button2_cta_style}
            >
            <Text style={{color: '#4A0784'}}> show sidebar </Text>
          </TouchableOpacity>
        </View>  
      <View style={this.state.sideBarStyle}>
          <View>
            <Text style={{color: 'white'}}> Building My Own Sidebar </Text>
          </View>
          <TouchableOpacity
            onPress={() => {this.showSideBar(false)}}
            style={style.button2_cta_style}
            >
            <Text style={{color: '#4A0784'}}> hide sidebar </Text>
          </TouchableOpacity>   
      </View>
      </View>

      );
    }
  }

  export default SideBar;