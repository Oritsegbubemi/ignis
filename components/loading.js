import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

export default function LoadingPage({navigation}) {

    useEffect(() => checkIfLoggedIn())

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user)
        {
            if(user)
            {
                navigation.navigate('Home')
            }
            else {
                navigation.navigate('AuthPage')
            }
        })
    }
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
        justifyContent: 'center',
    },
});
