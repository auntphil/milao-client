import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import jwt_decode from "jwt-decode";

//Screens
import Loading from './LoadingScreen.jsx'
import * as SecureStore from 'expo-secure-store'

const HomeScreen = () => {
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState('')
    const data = ''
    const error = false;
    const navigation = useNavigation()

    useEffect( () => {
        const getToken = async () => {
            SecureStore.getItemAsync('token')
            .then( raw => {
                const token = jwt_decode(raw);

                //Checking if Token Exists and Not Expired
                if(raw === null || token.exp < Math.round(Date.now() / 1000)){
                    handleLogout()
                    return
                }

                setToken(raw)
                setLoading(false)
            })
            .catch( err => {
                handleLogout()
                return
            })
        }
        
        getToken()
    },[])

    const handleLogout = async () => {
        console.log('HomeScreen: handleLogout')
        //Remove Tokens
        await SecureStore.deleteItemAsync('refresh')
        await SecureStore.deleteItemAsync('token')
        navigation.replace('Setup')
    }
    
    if(loading) return <Loading />
    if(error){
        if(error.message === "Not Authorized"){
            console.log('HomeScreen: Error')
            handleLogout()
            return <Loading />
        }
    }


    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
        >
            <Text>Home Screen</Text>
            <Text>EMAIL</Text>
            <Text>Token: {token}</Text>
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