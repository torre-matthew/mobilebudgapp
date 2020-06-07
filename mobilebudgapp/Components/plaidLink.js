import React, { Component } from 'react';
import { ImageBackground, Image, Text, TouchableOpacity, NativeEventEmitter, NativeModules } from 'react-native';
import { Container, Header, Left, Body, Right, Title, View } from 'native-base';
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
import PlaidLink from 'react-native-plaid-link-sdk';

const backgroundImage = require('../Styles/images/whiteWall.png');

class PlaidLinkComponent extends Component {

  state = {
  }

  componentDidMount() {
    const emitter = new NativeEventEmitter(Platform.OS === 'ios' ? NativeModules.RNLinksdk : NativeModules.PlaidAndroid);
    this._listener = emitter.addListener('onEvent', (e) => console.log(e));
  }

  componentWillUnmount() {
    if (this._listener) {
      this._listener.remove();
    }
  }


  render() {
    return (
      <PlaidLink
     // Replace any of the following <#VARIABLE#>s according to your setup,
     // for details see https://plaid.com/docs/quickstart/#client-side-link-configuration
 
      publicKey='ed1160c480b8d7760f30867ac52d83'
      clientName='Plaid Link for LahriApp'
      env='sandbox'  // 'sandbox' or 'development' or 'production'
      product={['auth, transactions']}
      onSuccess={data => console.log('success: ', data)}
      onExit={data => console.log('exit: ', data)}
 //
      // Optional props
      // countryCodes={['<# Country Code #>']}
      // accountSubtypes= {{'<#Type#>': ['<# Subtype #>']}}
      // language='<# Language #>'
      // userEmailAddress='<# User Email #>'
      // userLegalName='<# User Legal Name #>'
      // userPhoneNumber='<# User Phone Number #>'
      // webhook='<# Webhook URL #>'
    >
      <Text
        // onTouchEnd={ApiMethods.getPlaidAccessToken().then(data => console.log('success: ', data)).catch(err => console.log(err))} 
        style={{color: '#474198', fontSize: 20}}> Add Account via Plaid Link </Text>
    </PlaidLink>
      
    );
  }
}
export default PlaidLinkComponent