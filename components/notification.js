import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Platform, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import firebase from 'firebase';
import { days_remaining } from './timer';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Notification() {
    var userId = firebase.auth().currentUser.uid;
    const [fname,setFname] = useState("");
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [events, setEvents] = useState("");
    const [ mtitle, setMtitle ] = useState("");
    const [ mbody, setMbody ] = useState("");
    const [ presence, setPresence ] = useState("");
    
    useEffect(() => getData())
    const getData = () => {
        firebase.database()
            .ref('/users/' + userId)
            .once('value')
            .then(snapshot => {
                setFname(snapshot.val().first_name)
                if (snapshot.val().events){
                    setEvents(snapshot.val().events)
                } else{
                    setEvents([])
                }
            });
    }

    async function sendPushNotification(expoPushToken) {
        const message = {
            to: expoPushToken,
            sound: 'default',
            title: mtitle,
            body: mbody,
            data: { data: 'goes here' },
        };
    
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }
    
    useEffect(() => {
        sendPushNotification(expoPushToken)
    }, [])
    
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });

        return async() => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
            await sendPushNotification(expoPushToken);
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{color: 'rgba(0,0,0,0.8)', fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>Hello {fname}!</Text>
            <Text style={{color: 'rgba(0,0,0,0.8)',  marginBottom: 10}}>You can view all your notifications here</Text>

            <View>
                <FlatList
                    data={Object.keys(events)}
                    renderItem={({item}) => {
                        if(days_remaining(events[item].dateYear,events[item].dateMonth,events[item].dateDay) <= 50 && days_remaining(events[item].dateYear,events[item].dateMonth,events[item].dateDay) > 0 ) {
                            return (
                                <View style={{backgroundColor: "white", borderBottomWidth: 1, borderColor: "#eee", width: screenWidth * 0.8, padding: 5, alignSelf: "center"}}>
                                    {setMtitle(`${events[item].eventName} ${events[item].event}`)}
                                    {setMbody(`Be reminded that you have ${days_remaining(events[item].dateYear,events[item].dateMonth,events[item].dateDay)} days left to complete event checklist`)}
                                    {async () => { await sendPushNotification(expoPushToken)}}
                                    {setPresence("Something")}

                                    <TouchableOpacity onPress={() => { async () => { await sendPushNotification(expoPushToken)}}} style={{height: screenHeight * 0.07}}>
                                        <View style={{paddingVertical: 5}}>
                                            <Text style={{fontSize: screenWidth*0.04, fontWeight: "bold"}}>{events[item].eventName}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", marginBottom: 5}}>
                                            <Text style={{fontSize: 10, fontSize: screenWidth*0.03, fontWeight: "400"}}>You have </Text>
                                            <Text style={{fontSize: screenWidth*0.03, fontWeight: "bold"}}>{days_remaining(events[item].dateYear,events[item].dateMonth,events[item].dateDay)} days</Text>
                                            <Text style={{fontSize: 10, fontSize: screenWidth*0.03, fontWeight: "400"}}> left to complete your event checklist</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        } else if(presence === "") {
                            return (
                                <View>
                                    <Text style={{textAlign: 'center', color: 'rgba(0,0,0,0.8)', }}> Sorry, You have no current notification... Come back later</Text>
                                </View>
                            )
                        }
                    }}
                    keyExtractor={(index) => index}
                />
            </View>
        </View>
    );
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        firebase
            .database()
            .ref('/users/' + firebase.auth().currentUser.uid + '/push_token/')
            .set(token)
        //console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
        });
    }
    return token;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "flex-start",
        margin: 10,
        marginTop: 20,
    },
})