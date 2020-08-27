import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import firebase from "firebase";
import { days_remaining } from './timer';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default function Events() {
    var userId = firebase.auth().currentUser.uid;
    const [todoo, setTodoo] = useState([]);
    const [events, setEvents] = useState("");
    const [eventID, seteventID] = useState("");
    const [expID, setExpID] = useState("");
    const [expEvent, setExpEvent] = useState("");

    // ToDo
    const deleteTodo = id => {
        setTodoo(prevTodo => {
            return prevTodo.filter(item => item.id != id);
        });
    };
    const addTodo = (id, todo) => {
        setTodoo(prevTodo => {
            return prevTodo.filter(item => item.id != id);
        });
        setTodoo(prevTodo => {
            return [{id: id, todo: todo}, ...prevTodo]
        });
    }
    function findById(source, id){
        for (var i = 0; i < source.length; i++){
            if (source[i].id === id){
                return true
            }
        }
        return false
    }
    const eventDatabase = (eventname) => {
        let him = firebase.database().ref('/users/' + userId + '/events/' + eventname)
        him.remove()
        setTimeout(() => {alert(`Completed Event Checklist`)}, 100)
    }

    const deleteAllEvent = () => {
        let allevent = firebase.database().ref('/users/' + userId + '/events')
        allevent.remove()
    }

    useEffect(() => getData())
    const getData = () => {
        firebase.database()
            .ref('/users/' + userId)
            .once('value')
            .then(snapshot => {
                if (snapshot.val().events){
                    setEvents(snapshot.val().events)
                } else{
                    setEvents([])
                }
            });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.keys(events)}
                renderItem={({item}) => {
                    if(days_remaining(events[item].dateYear,events[item].dateMonth,events[item].dateDay) > 0) {
                        return (
                            expID == events[item].eventName && expEvent == events[item].event?(  
                                <View style={{backgroundColor: "white", borderBottomWidth: 1, borderColor: "#eee", width: screenWidth * 0.8, padding: 12, alignSelf: "center"}}>
                                    <TouchableOpacity  onPress={() => {setExpID(""); setExpEvent("")}}  style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: screenHeight * 0.05}}>
                                        <Text style={{fontSize: screenWidth*0.045, fontWeight: "bold"}}>{events[item].eventName} {events[item].event}</Text>
                                        <MaterialCommunityIcons name="chevron-down" style={{color: 'blue', fontSize: screenWidth*0.08}}/>
                                    </TouchableOpacity>

                                    <View style={{flexDirection: "row", marginBottom: 5}}>
                                        <Text style={{fontSize: screenWidth*0.03, fontWeight: "bold"}}>{days_remaining(events[item].dateYear,events[item].dateMonth,events[item].dateDay)}</Text>
                                        <Text style={{fontSize: 10, fontSize: screenWidth*0.03, fontWeight: "bold"}}> days left</Text>
                                    </View>

                                    <ScrollView horizontal alwaysBounceVertical showsHorizontalScrollIndicator={false} style={{ padding: 0, margin: 0, flex: 1}}>
                                        <View style={{justifyContent: "flex-start", alignItems: "center"}}>
                                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>

                                                <FlatList
                                                data={events[item].todolist}
                                                renderItem={({item}) =>
                                                findById(todoo, item.id) == true?(
                                                    <View>
                                                        <TouchableOpacity onPress={() => deleteTodo(item.id)} style={{backgroundColor: "white", borderBottomWidth: 0, borderColor: "#eee", width: screenWidth * 0.8, padding: 6, alignSelf: "center"}}>
                                                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                                                <View style={{flexDirection: "row", alignItems: "center" }}>
                                                                        <MaterialCommunityIcons name="chevron-double-right" style={{color: 'green', fontSize: screenWidth*0.03}}/>
                                                                    <Text style={{fontSize: screenWidth*0.035}}>{item.todo}</Text>
                                                                </View>

                                                                <View style={{alignItems: "center", marginHorizontal: 5}}>
                                                                    <MaterialCommunityIcons name="check" style={{color: 'green', fontSize: screenWidth*0.05}}/>
                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                ):(
                                                    <View>
                                                        <TouchableOpacity onPress={() => addTodo(item.id, item.todo)} style={{backgroundColor: "white", borderBottomWidth: 0, borderColor: "#eee", width: screenWidth * 0.8, padding: 6, alignSelf: "center"}}>
                                                            <View style={{flexDirection: "row", alignItems: "center"}} animation="pulse" easing="ease-out" iterationCount="infinite">
                                                                <MaterialCommunityIcons name="chevron-double-right" style={{color: 'green', fontSize: screenWidth*0.03}}/>
                                                                <Text style={{fontSize: screenWidth*0.035}}>{item.todo}</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                                keyExtractor={(item, index) => index}
                                                ListFooterComponent={
                                                    <View style={{flexDirection: "row", alignItems: "center", margin: 10, justifyContent: 'center', alignSelf: 'center' }}>
                                                        <TouchableOpacity onPress={() => eventDatabase(events[item].eventName + events[item].event)} style={{backgroundColor: "#00695c", width: screenWidth * 0.48, height: screenHeight * 0.05, borderRadius: 10, alignItems: "center", justifyContent: "center", marginRight: screenWidth*0.02}}>
                                                            <MaterialCommunityIcons name="check-outline" style={{color: 'white', fontSize: screenWidth*0.08 }}/>
                                                        </TouchableOpacity>
                                                    </View>
                                                }
                                                />
                                            </View> 
                                        </View>
                                    </ScrollView>
                                </View>
                            ):(
                                <TouchableOpacity onPress={() => {setExpID(events[item].eventName); setExpEvent(events[item].event)}} style={{backgroundColor: "white", borderBottomWidth: 1, borderColor: "#eee", width: screenWidth * 0.8, padding: 12, alignSelf: "center"}}>
                                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: screenHeight * 0.04}}>
                                        <Text style={{fontSize: screenWidth*0.045}}>{events[item].eventName}</Text>
                                        <MaterialCommunityIcons name="chevron-right" style={{color: 'blue', fontSize: screenWidth*0.08}}/>
                                    </View>
                                </TouchableOpacity> 
                            )
                        )
                    }
                }
            }
            keyExtractor={(index) => index}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "space-evenly",
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