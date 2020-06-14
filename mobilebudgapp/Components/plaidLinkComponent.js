import React, { Component } from 'react';
import { ImageBackground, Image, View, Text, TouchableOpacity, NativeEventEmitter, NativeModules } from 'react-native';
import { Container, Header, Left, Body, Right, Title} from 'native-base';
import style from "../Styles/Styles";
import ApiMethods from '../utilities/apiMethods';
/// <reference path='../types/react-native-plaid-link-sdk/index.d.ts' />
import PlaidLink from 'react-native-plaid-link-sdk';

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

// ApiMethods.getPlaidAccessToken().then(data => console.log('success: ', data)).catch(err => console.log(err))
  render() {
    return (
      <View>
      <PlaidLink
     // Replace any of the following <#VARIABLE#>s according to your setup,
     // for details see https://plaid.com/docs/quickstart/#client-side-link-configuration
 
      publicKey='ed1160c480b8d7760f30867ac52d83'
      clientName='Plaid Link for LahriApp'
      env='sandbox'  // 'sandbox' or 'development' or 'production'
      product={['auth', 'transactions']}
      onSuccess={public_token => {ApiMethods.getPlaidAccessToken(public_token).then(data => console.log('success: ', data)).catch(err => console.log(err))}}
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
    <Text style={{color: '#474198', fontSize: 20}}>
       Add Account via Plaid
    </Text>  
    </PlaidLink>
    </View>
    );
  }
}
export default PlaidLinkComponent