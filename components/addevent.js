import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons"
import { Actions } from 'react-native-router-flux';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default function AddEvent() {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={Actions.Formal}>
        <View style={{alignItems: "center", justifyContent: "center", marginHorizontal:10, flexDirection: "row"}}>
            <View style={styles.minipictureModule1}>
            <MaterialCommunityIcons name="account-tie" style={{color: 'white', fontSize: screenWidth*0.15 }}/>
            </View>
            <View style={{width: screenWidth * 0.5, height: screenWidth * 0.2, backgroundColor: "#ef9a9a", borderBottomRightRadius: 3, borderTopRightRadius: 3, overflow: "hidden"}}>
                <Text style={{color: "#990011FF", fontSize: 15, alignSelf: "flex-start", marginLeft: 7, marginVertical: 5}}>Formal</Text>
                <Text style={{color: "#990011FF", fontSize: 7, alignSelf: "flex-start", marginLeft: 7, flexWrap: "wrap"}}>Seminars, Board/Business Meeting, Conferences, Product Launch, Trade show, Appreciation Ceremonies...</Text>
            </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.Semiformal}>
        <View style={{alignItems: "center", justifyContent: "center", marginHorizontal:10, flexDirection: "row"}}>
            <View style={styles.minipictureModule2}>
            <MaterialCommunityIcons name="account" style={{color: 'white', fontSize: screenWidth*0.15 }}/>
            </View>
            <View style={{width: screenWidth * 0.5, height: screenWidth * 0.2, backgroundColor: "#b3e5fc", borderBottomRightRadius: 3, borderTopRightRadius: 3}}>
                <Text style={{color: "#01579b", fontSize: 15, alignSelf: "flex-start", marginLeft: 7, marginVertical: 5}}>Semi Formal</Text>
                <Text style={{color: "#01579b", fontSize: 7, alignSelf: "flex-start", marginLeft: 7, flexWrap: "wrap"}}>Charity events, Fundraiser...</Text>
            </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={Actions.Informal}>
        <View style={{alignItems: "center", justifyContent: "center", marginHorizontal:10, flexDirection: "row"}}>
            <View style={styles.minipictureModule3}>
            <MaterialCommunityIcons name="account-outline" style={{color: 'white', fontSize: screenWidth*0.15}}/>
            </View>
            <View style={{width: screenWidth * 0.5, height: screenWidth * 0.2, backgroundColor: "#b2dfdb", borderBottomRightRadius: 3, borderTopRightRadius: 3}}>
                <Text style={{color: "#00695c", fontSize: 15, alignSelf: "flex-start", marginLeft: 7, marginVertical: 5}}>Informal</Text>
                <Text style={{color: "#00695c", fontSize: 7, alignSelf: "flex-start", marginLeft: 7, flexWrap: "wrap"}}>Weddings, Parties, Reunions, Baby showers, Picnics...</Text>
            </View>
        </View>
        </TouchableOpacity>
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
