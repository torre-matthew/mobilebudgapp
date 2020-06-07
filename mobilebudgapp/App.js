import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, RefreshControl, Button } from 'react-native';
import * as Google from 'expo-google-app-auth'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './Screens/mainScreen';
import LoginScreen from './Screens/loginScreen';
import CreateNewBudgetScreen from './Screens/createNewBudgetScreen';
import SettingsScreen from './Screens/settingsScreen';
import EditEntryScreen from './Screens/editEntryScreen';
import SelectFundingSourceScreen from './Screens/selectFundingSourceScreen';
import TransactionsScreen from './Screens/transactionsScreen';
import BillPayScreen from './Screens/billPayScreen';
import TrendsScreen from './Screens/trendsScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
      {/* <Stack.Screen
          name="Login"
          component={LoginScreen}
        /> */}
        <Stack.Screen
          name="Main"
          component={MainScreen}
        />
        <Stack.Screen
          name="Create New Budget"
          component={CreateNewBudgetScreen}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
          name="Edit Entry"
          component={EditEntryScreen}
        />
        <Stack.Screen
          name="Select Funding Source"
          component={SelectFundingSourceScreen}
        />
        <Stack.Screen
          name="Transactions"
          component={TransactionsScreen}
        />
        <Stack.Screen
          name="Bill Pay"
          component={BillPayScreen}
        />
        <Stack.Screen
          name="Trends"
          component={TrendsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;