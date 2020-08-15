import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import {firebaseConfig} from "./config";
firebase.initializeApp(firebaseConfig);
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import AuthPage from './components/Auth/AuthPage'
import LoadingPage from './components/loading'
import Home from './components/home'
export default function App() {
  console.disableYellowBox = true;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='transparent' barStyle='light-content' translucent= {true} hidden={true} />
      <AppNavigator />
    </View>
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingPage:LoadingPage,
  AuthPage:AuthPage,
  Home:Home
})
const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
