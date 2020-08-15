import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons} from "@expo/vector-icons"
import { Actions } from 'react-native-router-flux';
import Routes from "./Auth/route"
import { BlurView } from 'expo-blur';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default function Home() {
    var userId = firebase.auth().currentUser.uid;
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [email,setEmail] = useState("");
    const [modalState,setmodalState] = useState(false);
    useEffect(() => getData())
    const getData = () => {
        firebase.database()
            .ref('/users/' + userId)
            .once('value')
            .then(snapshot => {
                setEmail(snapshot.val().email)
                setFname(snapshot.val().first_name)
                setLname(snapshot.val().lastname)
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                    // Background Linear Gradient
                    colors={['#02B1CB', '#FCCABD']}
                    style={{
                        alignSelf: "center",
                        position: 'absolute',
                        top: 0,
                        height: screenHeight / 2,
                        width: screenWidth
                    }}
                />
                <LinearGradient
                    // Background Linear Gradient
                    colors={['#FCCABD', 'transparent']}
                    style={{
                        position: 'absolute',
                        alignSelf: "center",
                        top: screenHeight / 2,
                        height: screenHeight / 2,
                        width: screenWidth
                    }}
                />
            <View style={{marginTop: 20}}>
                <Text style={{color: 'rgba(0,0,0,0.8)', fontSize: 30, fontWeight: 'bold'}}>Hello {fname}!</Text>
            </View>
            <View>
                <View style={{marginVertical: 20, alignItems: "center"}}>
                    <TouchableOpacity style={{width: screenWidth * 0.4, height: screenWidth * 0.4, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 10, alignItems: "center", justifyContent: "center"}} onPress={() => {setmodalState(true), setTimeout(() => {Actions.AddEvent.call()}, 500)}}>
                        <View style={{ width: screenWidth * 0.25, height: screenWidth * 0.25, backgroundColor: "#02B1CB", alignItems: "center", justifyContent: "center", borderRadius: screenWidth * 0.15}}>
                            <MaterialCommunityIcons name="plus" style={{fontSize: 80, color: "white"}} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "white", marginTop: 5}}>Add Event</Text>
                </View>
                <View style={{marginVertical: 20, alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {setmodalState(true), setTimeout(() => {Actions.Events.call()}, 500)}} style={{width: screenWidth * 0.4, height: screenWidth * 0.4, backgroundColor: "rgba(255,255,255,0.8)", borderRadius: 10, alignItems: "center", justifyContent: "center"}}>
                        <View style={{ width: screenWidth * 0.25, height: screenWidth * 0.25, backgroundColor: "#02B1CB", alignItems: "center", justifyContent: "center", borderRadius: screenWidth * 0.15}}>
                            <MaterialCommunityIcons name="calendar-multiple" style={{fontSize: 60, color: "white"}} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "white", marginTop: 5}}>Events</Text>
                </View>
            </View>
            <Animatable.View  animation="pulse" easing="ease-out" iterationCount="infinite" >
                <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                    <MaterialCommunityIcons name="account-remove-outline" style={{ margin: 0, fontSize: 60, color: "#02B1CB", marginBottom: 5}} />
                </TouchableOpacity>
            </Animatable.View>

            <Modal
                transparent={true}
                onRequestClose={() => setmodalState(false)}
                visible={modalState}>
                <BlurView intensity={100} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}>
                    <Animatable.View animation="bounceIn" delay={0} style={{alignSelf: 'center', backgroundColor: "white", margin: screenHeight* 0.1, padding: 3, borderRadius: 10, flex: 1, width: screenWidth * 0.85}}>
                        <Routes/>
                    </Animatable.View>

                    <TouchableOpacity onPress={() => setmodalState(false)}>
                        <SafeAreaView style={{alignItems: 'center'}}>
                            <Animatable.View style={{width: 50, height: 50, backgroundColor: 'red', borderRadius: 25, alignItems: "center", justifyContent: "center", overflow: "hidden"}} animation="pulse" easing="ease-out" iterationCount="infinite">
                                <MaterialCommunityIcons name="close" style={{color: 'white', fontSize: screenWidth*0.1 }}/>
                            </Animatable.View>
                            <Text style={styles.text}>Close</Text>
                        </SafeAreaView>
                    </TouchableOpacity>
                </BlurView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "space-between",
    },
});
