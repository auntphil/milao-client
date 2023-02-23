import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import jwt_decode from "jwt-decode";

//Screens
import Loading from './LoadingScreen.jsx'
import * as SecureStore from 'expo-secure-store'

async function getUserData(token, uri) {
    try{
        //Fetch User Data with token
        const raw = await fetch(`${uri}/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${token}`
            }
        })
        const data = await raw.json()
        if ( !data.success ){
            //No User Returned
            return false
        }else{
            //User found and returned
            return data.user
        }
    }catch( err ){
        console.error(err)
        return false
    }
}

const HomeScreen = (props) => {
    //Navigation
    const navigation = useNavigation()

    //Props
    const {uri} = props

    //State
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState('')
    const error = false;

    useEffect( () => {
        const checkUser = async () => {
            SecureStore.getItemAsync('token')
            .then( async raw => {
                
                //Checking if Token Exists
                if(raw === null){
                    console.log('No Token')
                    handleLogout()
                    return
                }

                //Decoding Token
                const token = jwt_decode(raw);

                //Checking if the token is expired
                if( token.exp < Math.round(Date.now() / 1000)){
                    console.log('expired Token')
                    handleLogout()
                    return
                }

                getUserData(raw, uri)
                    .then( userData => {
                        //No userData returned
                        if(!userData){
                            console.log('No userdata')
                            handleLogout()
                            return
                        }
        
                        setToken(raw)
                        setLoading(false)
                    })
            })
            .catch( err => {
                handleLogout()
                return
            })
        }
        
        checkUser()
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