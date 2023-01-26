import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ChatScreen from './ChatScreen.jsx'
import { useQuery } from '@apollo/client'
import { GET_USER } from '../Schema/Query.js'
import Loading from './LoadingScreen.jsx'
import * as SecureStore from 'expo-secure-store'

const HomeScreen = () => {
    const navigation = useNavigation()
    const {data, loading, error } = useQuery(GET_USER)
    const handleLogout = async () => {
        console.log('HomeScreen: handleLogout')
        //Remove Refresh Token
        //await SecureStore.deleteItemAsync('refresh')
        //await SecureStore.deleteItemAsync('token')
        navigation.replace('Splash')
    }
    
    if(loading) return <Loading />
    if(error){
        if(error.message === "Not Authorized"){
            console.log('HomeScreen: Error')
            handleLogout()
            return <Loading />
        }
    }

    
    if(typeof data === 'undefined'){
        handleLogout()
        return <Loading />
    }
    
    console.log(`HomeScreen: No Error`)

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
        >
            <Text>Home Screen</Text>
            <Text>{data.user.email}</Text>
            <ChatScreen />
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