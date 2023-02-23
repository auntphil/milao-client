import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

//Styles
import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'
import Loading from './LoadingScreen'

const LoginScreen = (props) => {

    //Navigation
    const navigation = useNavigation()
    
    //Props
    const {uri} = props
    
    //State
    const [username, setUsername] = useState("andrew")
    const [pass, setPass] = useState("password")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = () => {

        //Attempting to Login as user
        fetch(`${uri}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: pass })
        })
        //Converting Response from JSON
        .then( (raw) => raw.json() )
        .then( async (data) => {
            if ( !data.success ){
                ToastAndroid.showWithGravity(data.message , ToastAndroid.LONG, ToastAndroid.CENTER)
            }else{
                await SecureStore.setItemAsync("token", data.token)
                await SecureStore.setItemAsync("rtoken", data.rtoken)
                navigation.replace('Home')
            }
        })
        .catch( err => ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.CENTER) )
    }

    if(typeof data !== 'undefined'){
       const saveUser = async () => {
           await SecureStore.setItemAsync('refresh', data.login.refresh)
           await SecureStore.setItemAsync('token', data.login.token)
            .then(() => {
                navigation.replace("Home")
            })
            .catch(err => ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.CENTER))
       }
       saveUser()
    }
    
    if (error){
        ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
    }
    if(loading){ return <Loading /> }

    return (
        <KeyboardAvoidingView style={[styles.wrapper]} >
            <View style={[Standard.wrapper_80]}>
                <TextInput
                    style={[Input.default]}
                    placeholder='Username'
                    onChangeText={text => setUsername(text)}
                    value={username}
                />
                <TextInput
                    style={[Input.default]}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => setPass(text)}
                    value={pass}
                />
            </View>
            <TouchableOpacity
                onPress={() => login()}
                style={[Btn.default, Btn.purple]}
            >
                <Text style={[Btn.text, Btn.purple_text]}>
                    Login
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
            
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})