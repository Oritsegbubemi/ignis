import React, { useState } from 'react';
import { StyleSheet, Text, Picker, View, TouchableOpacity, Dimensions, Image, ScrollView, Modal, TextInput, FlatList, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons} from "@expo/vector-icons"
import * as Animatable from 'react-native-animatable';
import fundraiser from "../assets/todojson/fundraiser.json";
import firebase from "firebase";
import { BlurView } from 'expo-blur';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default function Semiformal() {

    const [modalState,setmodalState] = useState(false);
    const [eventState,seteventState] = useState("");
    const [jsonState,setjsonState] = useState("");
    const [todoo, setTodoo] = useState([]);
    const [eventID, seteventID] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

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
        if(eventID == ""){
            alert("Please input a name for your "+ eventState)
        }
        else if(day == "" || month == "" || year == ""){
            alert("Please set a date!")
        }
        else if(todoo == ""){
            alert("Please select items for your todo list!")
        }
        else{
            firebase
            .database()
            .ref('/users/' + firebase.auth().currentUser.uid + '/events/' + eventID.toLowerCase() + eventState.toLowerCase()).update({
                event: eventState,
                eventName: eventID,
                dateCreated: Date.now(),
                dateDay: day,
                dateMonth: month,
                dateYear: year,
                todolist: todoo
            })
            setDay(""); setMonth(""); setYear(""); setTodoo([]); seteventID(""); setmodalState("")
            setTimeout(() => {alert(`Added ${eventID} to event list`)}, 100)
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={{marginVertical: 5}} onPress={() => {setmodalState(true); seteventState("Fundraiser"); setjsonState(fundraiser)}}>
            <View style={{alignItems: "center", justifyContent: "center", marginHorizontal:10, flexDirection: "row"}}>
                <View style={styles.minipictureModule2}>
                <Image style={styles.imagee} resizeMode="contain" source={require("../assets/images/fundraiser.png")}/>
                </View>
                <View style={{width: screenWidth * 0.55, height: screenWidth * 0.2, backgroundColor: "#b3e5fc", borderBottomRightRadius: 3, borderTopRightRadius: 3}}>
                    <Text style={{color: "#01579b", fontSize: 12, alignSelf: "flex-start", marginHorizontal: 7, marginVertical: 5, fontWeight: "bold"}}>Fundraiser</Text>
                    <Text style={{color: "#01579b", fontSize: 9, alignSelf: "flex-start", marginHorizontal: 7, flexWrap: "wrap"}}>An event held to generate financial support for a charity, cause, or other enterprise.</Text>
                </View>
            </View>
            </TouchableOpacity>
            </ScrollView>
            <Modal
            transparent={true}
            onRequestClose={() => setmodalState(false)}
            visible={modalState}>  
                <BlurView intensity={100} style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}>
                    <Animatable.View animation="slideInUp" delay={0} style={{marginTop: 100, alignSelf: 'center', backgroundColor: "white", margin: screenHeight* 0.06, padding: 3, borderRadius: 10, flex: 1, width: screenWidth * 0.85, height: screenWidth* 0.9}} on>
                        <Text style={{fontSize: 20, textAlign: "center", margin: 0, paddingVertical:10, fontWeight: "bold"}}>{eventState}</Text>
                        <ScrollView>
                        <View style={{alignItems: "center", marginVertical: 10}}>
                            <TextInput style={styles.inputBox} placeholderTextColor='rgba(0,0,0,0.5)' onChangeText={text => seteventID(text)} placeholder={eventState + " name"} />
                            <Text style={{marginTop: 10, marginBottom: 0, color: '#b2dfdb', fontWeight: 'bold'}}>Select Date</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Picker
                                    style={styles.onePicker} itemStyle={styles.onePickerItem}
                                    selectedValue={year}
                                    onValueChange={(itemValue) => {setYear(itemValue)}}
                                    >
                                    <Picker.Item label="Year" value="" />
                                    <Picker.Item label="2020" value={2020} />
                                    <Picker.Item label="2021" value={2021} />
                                    <Picker.Item label="2022" value={2022} />
                                    <Picker.Item label="2023" value={2023} />
                                    <Picker.Item label="2024" value={2024} />
                                    <Picker.Item label="2025" value={2025} />
                                    <Picker.Item label="2026" value={2026} />
                                    <Picker.Item label="2027" value={2027} />
                                    <Picker.Item label="2028" value={2028} />
                                    <Picker.Item label="2029" value={2029} />
                                    <Picker.Item label="2030" value={2030} />
                                </Picker>
                                <Picker
                                    style={styles.onePicker} itemStyle={styles.onePickerItem}
                                    selectedValue={month}
                                    onValueChange={(itemValue) => {setMonth(itemValue)}}
                                    >
                                    <Picker.Item label="Month" value="" />
                                    <Picker.Item label="January" value={1} />
                                    <Picker.Item label="February" value={2} />
                                    <Picker.Item label="March" value={3} />
                                    <Picker.Item label="April" value={4} />
                                    <Picker.Item label="May" value={5} />
                                    <Picker.Item label="June" value={6} />
                                    <Picker.Item label="July" value={7} />
                                    <Picker.Item label="August" value={8} />
                                    <Picker.Item label="September" value={9} />
                                    <Picker.Item label="October" value={10} />
                                    <Picker.Item label="November" value={11} />
                                    <Picker.Item label="December" value={12} />
                                </Picker>
                                <Picker
                                    style={styles.onePicker} itemStyle={styles.onePickerItem}
                                    selectedValue={day}
                                    onValueChange={(itemValue) => {setDay(itemValue)}}
                                    >
                                    <Picker.Item label="Day" value="" />
                                    <Picker.Item label="1" value={1} />
                                    <Picker.Item label="2" value={2} />
                                    <Picker.Item label="3" value={3} />
                                    <Picker.Item label="4" value={4} />
                                    <Picker.Item label="5" value={5} />
                                    <Picker.Item label="6" value={6} />
                                    <Picker.Item label="7" value={7} />
                                    <Picker.Item label="8" value={8} />
                                    <Picker.Item label="9" value={9} />
                                    <Picker.Item label="10" value={10} />
                                    <Picker.Item label="11" value={11} />
                                    <Picker.Item label="12" value={12} />
                                    <Picker.Item label="13" value={13} />
                                    <Picker.Item label="14" value={14} />
                                    <Picker.Item label="15" value={15} />
                                    <Picker.Item label="16" value={16} />
                                    <Picker.Item label="17" value={17} />
                                    <Picker.Item label="18" value={18} />
                                    <Picker.Item label="19" value={19} />
                                    <Picker.Item label="20" value={20} />
                                    <Picker.Item label="21" value={21} />
                                    <Picker.Item label="22" value={22} />
                                    <Picker.Item label="23" value={23} />
                                    <Picker.Item label="24" value={24} />
                                    <Picker.Item label="25" value={25} />
                                    <Picker.Item label="26" value={26} />
                                    <Picker.Item label="27" value={27} />
                                    <Picker.Item label="28" value={28} />
                                    <Picker.Item label="29" value={29} />
                                    <Picker.Item label="30" value={30} />
                                    <Picker.Item label="31" value={31} />
                                </Picker>
                            </View>
                            <Text style={{marginTop: 10, marginBottom: 0, color: '#b2dfdb', fontWeight: 'bold'}}>TODO List</Text>
                        </View>

                        <FlatList
                        data={jsonState}
                        renderItem={({item}) =>
                        findById(todoo, item.id) == true?(
                        <TouchableOpacity onPress={() => deleteTodo(item.id)} style={{backgroundColor: "white", borderBottomWidth: 1, borderColor: "#eee", width: screenWidth * 0.75, padding: 12, alignSelf: "center"}}>
                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: screenHeight * 0.04}}>
                                <Text style={{fontSize: screenWidth*0.03}}>{item.todo}</Text>
                                <MaterialCommunityIcons name="check" style={{color: 'green', fontSize: screenWidth*0.05}}/>
                            </View>
                        </TouchableOpacity>
                        ):(
                        <TouchableOpacity onPress={() => addTodo(item.id, item.todo)} style={{backgroundColor: "white", borderBottomWidth: 1, borderColor: "#eee", width: screenWidth * 0.75, padding: 12, alignSelf: "center"}}>
                            <Animatable.View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: screenHeight * 0.04}} animation="pulse" easing="ease-out" iterationCount="infinite">
                                <Text style={{fontSize: screenWidth*0.03}}>{item.todo}</Text>
                            </Animatable.View>
                        </TouchableOpacity>
                        )
                        }
                        keyExtractor={(item, index) => index}
                        />


                        <View style={{flexDirection: "row", alignItems: "center", margin: 10, justifyContent: 'center', alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => eventDatabase()} style={{backgroundColor: "#00695c", width: screenWidth * 0.48, height: screenHeight * 0.05, borderRadius: 10, alignItems: "center", justifyContent: "center", marginRight: screenWidth*0.02}}>
                                <MaterialCommunityIcons name="check-outline" style={{color: 'white', fontSize: screenWidth*0.08 }}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor: "#990011FF", width: screenWidth * 0.2, height: screenHeight * 0.05, borderRadius: 10, alignItems: "center", justifyContent: "center"}} onPress={() => {setmodalState(false); setDay(""); setMonth(""); setYear(""); setTodoo([]); seteventID("")}}>
                                <MaterialCommunityIcons name="close-outline" style={{color: 'white', fontSize: screenWidth*0.08 }}/>
                            </TouchableOpacity>
                        </View>
                        </ScrollView>
                    </Animatable.View>

                    <TouchableOpacity onPress={() => setmodalState(false)}>
                        <SafeAreaView style={{alignItems: 'center', marginBottom: 10}}>
                            <Animatable.View style={{width: 50, height: 50, backgroundColor: 'red', borderRadius: 25, alignItems: "center", justifyContent: "center", overflow: "hidden"}} animation="pulse" easing="ease-out" iterationCount="infinite">
                                <MaterialCommunityIcons name="close" style={{color: 'white', fontSize: screenWidth*0.1 }}/>
                            </Animatable.View>
                        </SafeAreaView>
                    </TouchableOpacity>
                </BlurView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    minipictureModule1: {
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
    },
    minipictureModule2: {
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
    },
    imagee: {
        flex: 1,
        resizeMode: "cover",
        width: screenWidth * 0.2,
        height: screenWidth * 0.1,
    },
    inputBox: {
        width: screenWidth * 0.65,
        height: screenHeight * 0.06,
        backgroundColor: '#b2dfdb',
        borderRadius: 10,
        padding:10,
        fontSize: 13,
        color: 'black',
        marginVertical: 10,
    },
    inputBoxx: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.05,
        backgroundColor: '#b2dfdb',
        borderRadius: 10,
        fontSize: 10,
        color: 'black',
        marginVertical: 10,
        textAlign: 'center'
    },
    onePicker: {
        width: screenWidth * 0.2,
        height: screenHeight * 0.1,
        backgroundColor: 'transparent',
    },
    onePickerItem: {
        height: screenHeight * 0.16,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 10
    },
});
