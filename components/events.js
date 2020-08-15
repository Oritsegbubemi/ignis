import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, FlatList } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import firebase from "firebase";
import * as Animatable from 'react-native-animatable';

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
    const addTodo = (id,todo) => {
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
    const eventDatabase = () => {
        // This should be worked upon ()
        // firebase
        // .database()
        // .ref('/users/' + firebase.auth().currentUser.uid + '/events/' + eventID.toLowerCase()).update({
        //     eventName: eventID,
        //     todolist: todoo
        // })
        // setTodoo([]); seteventID(""); setmodalState("")
        setTimeout(() => {alert(`Completed Event Todo`)}, 100)
        
    }

    //Others
    useEffect(() => getData())
    const getData = () => {
        firebase.database()
            .ref('/users/' + userId)
            .once('value')
            .then(snapshot => {
                if (snapshot.val().events){
                    //console.log('User data: ', snapshot.val().events.Seminar.daniel);
                    setEvents(snapshot.val().events)
                }else{
                    setEvents([])
                }
            });
    }
    const leap_year = year => {
        if (year % 4 == 0 && year % 100 != 0){
            return true
        }
        else if (year % 100 == 0 && year % 400 == 0){
            return true
        }
        else{
            return false
        }
    }
    const days_in_month = (year, month) => {
        if (month == 1 || month == 3 || month==5 || month==7 || month==8 || month==10 || month==12){
            return 31
        }
        else if (month ==4 || month==6 || month ==9 || month ==11){
            return 30
        }
        else if (leap_year(year)){
            return 29
        }
        else{
            return 28
        }
    }
    const days_between = (year1, month1, day1, year2, month2, day2) => {
        var year = year2 - year1
        if(year > 0){
            var i = year1
            var day = 0
            while(i <= year2){
                if (i == year1){
                    var j = month1
                    while (j <= 12){
                        if (j == month1){
                            day = day + (days_in_month(year1, j) - day1)
                            j += 1
                        }
                        else{
                            day = day + days_in_month(year1, j)
                            j += 1
                        }
                    }
                    i = i + 1
                }
                else if (i == year2){
                    j = 1
                    while (j <= month2){
                        if (j == month2){
                            day = day + day2
                            j += 1
                        }
                        else{
                            day = day + days_in_month(year2, j)
                            j += 1
                        }
                    }
                    i += 1
                }
                else{
                    j = 1
                    while (j <= 12){
                        day = day + days_in_month(i,j)
                        j += 1
                    }
                    i += 1
                }
            }
            return day
        }
        else if(year == 0){
            if (month2 > month1){
                month = month2 - month1
                i = month1
                day = 0
                while (i <= month2){
                    if (i == month2){
                        day = day + day2
                        i += 1
                    }
                    else if (i == month1){
                        day = day + (days_in_month(year2, i) - day1)
                        i += 1
                    }
                    else{
                        day = day + days_in_month(year2, i)
                        i += 1
                    }
                }
                return day
            }
            else if (month2 == month1){
                if (day2 > day1){
                    day = day2 - day1
                    return day
                }
                else{
                    return 0
                }
            }
            else{
                return 0
            }

        }
        else{
            return 0
        }
    }

    const days_remaining = (year, month, day) => {
        const date = new Date();
        const currentYear = date.getFullYear();
        const today = date.getDate();
        const currentMonth = date.getMonth() + 1;   
        const dr = days_between(currentYear, currentMonth, today, year, month, day)
        return dr
    }

    return (
        <View style={styles.container}>
            <FlatList
            data={Object.keys(events)}
            renderItem={({item}) =>
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


                {/* The Event todo */}

                <ScrollView horizontal alwaysBounceVertical showsHorizontalScrollIndicator={false} style={{ padding: 0, margin: 0, flex: 1}}>
                    <View style={{justifyContent: "flex-start", alignItems: "center"}}>
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"}}>

                            {/* Old FlatList */}
                            <FlatList
                            data={events[item].todolist}
                            renderItem={({item}) =>
                            findById(todoo, item.id) == true?(
                                <View>
                                    <TouchableOpacity onPress={() => deleteTodo(item.id)} style={{backgroundColor: "white", borderBottomWidth: 0, borderColor: "#eee", width: screenWidth * 0.8, padding: 12, alignSelf: "center"}}>
                                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: screenHeight * 0.02,  width: screenWidth * 0.65}}>
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
                                    <View>
                                        <TouchableOpacity onPress={() => addTodo(item.id, item.todo)} style={{backgroundColor: "white", borderBottomWidth: 0, borderColor: "#eee", width: screenWidth * 0.8, padding: 12, alignSelf: "center"}}>
                                            <Animatable.View style={{flexDirection: "row", alignItems: "center"}} animation="pulse" easing="ease-out" iterationCount="infinite">
                                                <MaterialCommunityIcons name="chevron-double-right" style={{color: 'green', fontSize: screenWidth*0.03}}/>
                                                <Text style={{fontSize: screenWidth*0.035}}>{item.todo}</Text>
                                            </Animatable.View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                            }

                            keyExtractor={(item, index) => index}
                            ListFooterComponent={
                                <View style={{flexDirection: "row", alignItems: "center", margin: 10, justifyContent: 'center', alignSelf: 'center' }}>
                                    <TouchableOpacity onPress={() => eventDatabase()} style={{backgroundColor: "#00695c", width: screenWidth * 0.48, height: screenHeight * 0.05, borderRadius: 10, alignItems: "center", justifyContent: "center", marginRight: screenWidth*0.02}}>
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
                    <Text style={{fontSize: screenWidth*0.045}}>{events[item].eventName} {events[item].event}</Text>
                    <MaterialCommunityIcons name="chevron-right" style={{color: 'blue', fontSize: screenWidth*0.08}}/>
                </View>
            </TouchableOpacity> 
            )
            }
            keyExtractor={(item, index) => index}
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


{/* <FlatList
data={events[item].todolist}
renderItem={({item}) =>
<View style={{backgroundColor: "white", borderBottomWidth: 0, borderColor: "#eee", width: screenWidth * 0.8, padding: 12, alignSelf: "center"}}>
    <View style={{flexDirection: "row", justifyContent: "flex-start", alignItems: "center", height: screenHeight * 0.015}}>
        <MaterialCommunityIcons name="chevron-double-right" style={{color: 'green', fontSize: screenWidth*0.03}}/>
        <Text style={{fontSize: screenWidth*0.030}}>{item.todo}</Text>
    </View>
</View>
}
keyExtractor={(item, index) => index}
/> */}
