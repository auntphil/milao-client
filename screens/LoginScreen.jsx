import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import AuthContext from '../context/AuthContext'

//Styles
import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'
import Loading from './LoadingScreen'

const LoginScreen = (props) => {

    //Navigation
    const navigation = useNavigation()

    //Get Context
    const {userLogin} = useContext(AuthContext)
    
    //State
    const [username, setUsername] = useState("andrew")
    const [password, setPassword] = useState("password")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async () => {
        const response = await userLogin(username, password)
        console.log(response)
        if(response){
            navigation.replace('Home')
        } else {
            setError("Incorrect Username or Password")
        }
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
        ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.CENTER)
    }

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
                    onChangeText={text => setPassword(text)}
                    value={password}
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