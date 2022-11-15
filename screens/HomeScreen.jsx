import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = ({user}) => {
    const navigation = useNavigation()

    
    const handleLogout = async () => {
        //Remove Refresh Token
        await SecureStore.deleteItemAsync('refresh')
        await SecureStore.deleteItemAsync('token')
        //Goto Login Screen
        navigation.replace("Splash")
    }
    
    if(user === null || typeof(user.id) === 'undefined'){
        //TODO Check Refresh Token
        //TODO Request New Token
        
        //TODO No Token -> Go To Splash
        handleLogout()
    }

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
        >
            <Text>Home Screen</Text>
            <Text>{user.email}</Text>
            <TouchableOpacity
                onPress={handleLogout}
                style={styles.button}
            >
                <Text style={styles.btn_text}>
                    Logout
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '65%',
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'purple',
        alignItems: 'center'
    },
    btn_text: {
        fontWeight: '700',
        color: 'white',
    }
})