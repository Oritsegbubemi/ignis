import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView, ActivityIndicator } from 'react-native';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons"
import { Actions } from 'react-native-router-flux';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default function Modaload() {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 50, fontWeight: "bold", marginBottom: 30}}>IGNIS</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "space-evenly"
  },
  minipictureModule1: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    backgroundColor: "#990011FF",
    borderRadius: 5,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    overflow: "hidden",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  minipictureModule2: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    backgroundColor: "#01579b",
    borderRadius: 5,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    overflow: "hidden",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  minipictureModule3: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    backgroundColor: "#00695c",
    borderRadius: 5,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    overflow: "hidden",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center"
  }
});
