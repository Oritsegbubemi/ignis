import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Modal, TouchableOpacity, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import { Register, Login, ResetPassword } from "./passAuth"

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default function AuthPage() {
    const [loginmodalState,setloginmodalState] = useState(true);
    const [signupmodalState,setsignupmodalState] = useState(false);
    const [signupPassmodalState,setsignupPassmodalState] = useState(false);

    const [signinD,setsigninD] = useState(false);
    const [signupD,setsignupD] = useState(false);
    const [signinButton,setsigninButton] = useState("Sign In");
    const [signupButton,setsignupButton] = useState("Submit");

    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [lemail,setlEmail] = useState("");
    const [semail,setsEmail] = useState("");
    const [lpassword,setlPassword] = useState("");
    const [spassword,setsPassword] = useState("");
    const [cpassword,setcPassword] = useState("");
    
    const onSigninclick = () => {
        setsigninD(true)
        setsigninButton(<View style={{height: 20, width: 20}}><ActivityIndicator size="small" /></View>)
        Login(lemail, lpassword)
    }

    const onSignupclick = () => {
        setsignupD(true)
        setsignupButton(<View style={{height: 20, width: 20}}><ActivityIndicator size="small"/></View>)
        Register(fname,lname,semail,spassword,cpassword)
    }


    const signin = () => {
        setsignupPassmodalState(false)
        setsignupmodalState(false)
        setloginmodalState(true)
    }

    const signup = () => {
        setloginmodalState(false)
        setsignupPassmodalState(false)
        setsignupmodalState(true)
    }
    const signupPass = () => {
        if(fname == "" || lname == "" || semail == ""){
            alert("Please complete all fields!")
        }else{
            setloginmodalState(false)
            setsignupmodalState(false)
            setsignupPassmodalState(true)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                transparent={true}
                visible={loginmodalState}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "space-between"}}>
                    <View style={{backgroundColor: "transparent", flex: 1}}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#02B1CB', '#FCCABD']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: screenHeight / 2,
                            }}
                        />

                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#FCCABD', 'transparent']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: screenHeight / 2,
                                height: screenHeight / 2,
                            }}
                        />

                        <Text style={{fontWeight: "bold", color: "black", fontSize: 50, alignSelf: "center", marginTop: 50}}>Ignis</Text>

                        <Animatable.View animation='bounceInLeft' delay={0} style={{alignSelf: 'center', borderColor: "black", overflow: "hidden", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", margin: screenHeight* 0.09, padding: 0, borderRadius: 15, flex: 1, width: screenWidth * 0.85, bottom: 0}}>
                            <View style={{alignItems: "center", marginTop: 5, width: screenWidth * 0.8, justifyContent:"space-between"}}>
                                <View>
                                    <Text style={{color: 'rgba(0,0,0,0.8)', fontSize: 13, fontWeight: 'bold', alignSelf:"flex-start", marginTop: 40}}>Email</Text>
                                    <TextInput style={styles.inputBox} placeholderTextColor='rgba(0,0,0,0.5)' keyboardType='email-address' onChangeText={text => {setlEmail(text.replace(/\s/g, '')); setsigninD(false); setsigninButton("Sign In")}}/>
                                    <Text style={{color: 'rgba(0,0,0,0.8)', fontSize: 13, fontWeight: 'bold', alignSelf:"flex-start", marginTop: 20}}>Password</Text>
                                    <TextInput style={styles.inputBox} placeholderTextColor='rgba(0,0,0,0.5)' secureTextEntry={true} onChangeText={text => {setlPassword(text.replace(/\s/g, '')); setsigninD(false); setsigninButton("Sign In")}}/>
                                    
                                    <TouchableOpacity style={styles.loginbtn} disabled={signinD} onPress={() => onSigninclick()}>
                                        <Text style={{color: 'white'}}>{signinButton}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{height: screenHeight* 0.2, justifyContent: "flex-end"}}>
                                    <View style={{flexDirection: "row", width: screenWidth * 0.72, justifyContent: "space-between", }}>
                                        <TouchableOpacity disabled={signinD} style={{alignItems: "center",}} onPress={() => ResetPassword(lemail)}>
                                            <View style={{alignItems: "center"}}>
                                                <Text style={{color: '#999999', fontSize: 10, fontWeight: "bold"}}>FORGOT</Text>
                                                <Text style={{color: '#999999', fontSize: 10, fontWeight: "bold"}}>DETAILS?</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity disabled={signinD} style={{alignItems: "center"}} onPress={() => signup()}>
                                            <View style={{alignItems: "center"}}>
                                                <Text style={{color: '#999999', fontSize: 10, fontWeight: "bold"}}>CREATE</Text>
                                                <Text style={{color: '#999999', fontSize: 10, fontWeight: "bold"}}>ACCOUNT</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Animatable.View>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={signupmodalState}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "space-between"}}>
                    <View style={{backgroundColor: "transparent", flex: 1}}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#02B1CB', '#FCCABD']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: screenHeight / 2,
                            }}
                        />
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#FCCABD', 'transparent']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: screenHeight / 2,
                                height: screenHeight / 2,
                            }}
                        />
                        <Text style={{fontWeight: "bold", color: "black", fontSize: 50, alignSelf: "center", marginTop: 50}}>Ignis</Text>
                        <Animatable.View animation='bounceInRight' delay={0} style={{alignSelf: 'center', borderColor: "black", overflow: "hidden", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", margin: screenHeight* 0.09, padding: 0, borderRadius: 15, flex: 1, width: screenWidth * 0.85, bottom: 0}}>
                            <View style={{alignItems: "center", marginTop: 30, width: screenWidth * 0.7}}>
                                <Text style={{color: 'rgba(0,0,0,0.8)', fontSize: 13, fontWeight: 'bold', alignSelf:"flex-start", marginTop: 10}}>First Name</Text>
                                <TextInput style={styles.inputBox} placeholderTextColor='rgba(0,0,0,0.5)' onChangeText={text => {setFname(text.replace(/\s/g, '')); setsignupD(false); setsignupButton("Submit")}}/>
                                <Text style={{color: 'rgba(0,0,0,0.8)', fontSize: 13, fontWeight: 'bold', alignSelf:"flex-start", marginTop: 10}}>Last Name</Text>
                                <TextInput style={styles.inputBox} placeholderTextColor='rgba(0,0,0,0.5)' onChangeText={text => {setLname(text.replace(/\s/g, '')); setsignupD(false); setsignupButton("Submit")}}/>
                                <Text style={{color: 'rgba(0,0,0,0.8)', fontSize: 13, fontWeight: 'bold', alignSelf:"flex-start", marginTop: 10}}>Email</Text>
                                <TextInput style={styles.inputBox} placeholderTextColor='rgba(0,0,0,0.5)' keyboardType='email-address' onChangeText={text => {setsEmail(text.replace(/\s/g, '')); setsigninD(false); setsignupButton("Submit")}}/>
                                
                                <TouchableOpacity style={styles.loginbtn} disabled={signupD} onPress={() => signupPass()}>
                                    <Text style={{color: 'white'}}>Next</Text>
                                </TouchableOpacity>
                                <View style={{marginTop:20}}>
                                    <Text style={{color: '#999999', fontSize: 10, fontWeight: "bold"}}>HAVE AN ACCOUNT?</Text>
                                </View>
                                <TouchableOpacity style={{marginTop:5}} onPress={() => signin()}>
                                    <Text style={{color: 'rgba(0,0,220,0.8)', fontSize: 15}}>Sign in</Text>
                                </TouchableOpacity>             
                            </View>
                        </Animatable.View>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={signupPassmodalState}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "space-between"}}>
                    <View style={{backgroundColor: "transparent", flex: 1}}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#02B1CB', '#FCCABD']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: screenHeight / 2,
                            }}
                        />
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#FCCABD', 'transparent']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: screenHeight / 2,
                                height: screenHeight / 2,
                            }}
                        />
                        <Text style={{fontWeight: "bold", color: "black", fontSize: 50, alignSelf: "center", marginTop: 50}}>Ignis</Text>
                        <Animatable.View animation='bounceInRight' delay={0} style={{alignSelf: 'center', borderColor: "black", overflow: "hidden", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", margin: screenHeight* 0.09, padding: 0, borderRadius: 15, flex: 1, width: screenWidth * 0.85, bottom: 0}}>
                            <View style={{alignItems: "center", marginTop: 30, width: screenWidth * 0.7}}>
                                <Text style={{color: 'rgba(0,0,0,0.8)', fontSize: 13, fontWeight: 'bold', alignSelf:"flex-start", marginTop: 20}}>Enter Password</Text>
                                <TextInput style={styles.inputBox} placeholderTextColor='rgba(0,0,0,0.5)' secureTextEntry={true} onChangeText={text => {setsPassword(text.replace(/\s/g, '')); setsignupD(false); setsignupButton("Submit")}}/>
                                <Text style={{color: 'rgba(0,0,0,0.8)', fontSize: 13, fontWeight: 'bold', alignSelf:"flex-start", marginTop: 20}}>Confirm Password</Text>
                                <TextInput style={styles.inputBox} placeholderTextColor='rgba(0,0,0,0.5)' secureTextEntry={true} onChangeText={text => {setcPassword(text.replace(/\s/g, '')); setsignupD(false); setsignupButton("Submit")}}/>
                                
                                <TouchableOpacity style={styles.loginbtnn} onPress={() => signup()}>
                                    <Text style={{color: 'white'}}>Previous</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.loginbtn} disabled={signupD} onPress={() => onSignupclick()}>
                                    <Text style={{color: 'white'}}>{signupButton}</Text>
                                </TouchableOpacity>

                                <View style={{marginTop:20}}>
                                    <Text style={{color: '#999999', fontSize: 10, fontWeight: "bold"}}>HAVE AN ACCOUNT?</Text>
                                </View>
                                <TouchableOpacity  style={{marginTop:5}} onPress={() => signin()}>
                                    <Text style={{color: 'rgba(0,0,220,0.8)', fontSize: 15}}>Sign in</Text>
                                </TouchableOpacity>             
                            </View>
                        </Animatable.View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: "flex-start",
        alignItems: "center"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    inputBox: {
        width: screenWidth * 0.7,
        height: screenHeight * 0.07,
        backgroundColor: 'rgba(255,0,255,0.2)',
        borderRadius: 10,
        paddingLeft:10,
        fontSize: 13,
        color: 'black',
        marginVertical: 5,
    },
    loginbtn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,220,0.8)',
        width: screenWidth * 0.6,
        height: screenHeight * 0.06,
        borderRadius: 50 ,
        marginTop: 30,
        alignSelf: "center"
    },
    loginbtnn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,220,0.4)',
        width: screenWidth * 0.6,
        height: screenHeight * 0.06,
        borderRadius: 50 ,
        marginTop: 25,
        alignSelf: "center"
    },
});