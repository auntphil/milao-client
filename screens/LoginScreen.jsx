import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../Schema/Mutation'
import Loading from './LoadingScreen'

const LoginScreen = ({setUser}) => {

    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [userData, {data, loading, error}] = useMutation(LOGIN)

    const login = () => {
        userData({variables: {loginInput: {email: email, password: pass}}})
    }

    if(typeof data !== 'undefined'){
       const saveUser = async () => {
            //setPageLoading(true)
           await SecureStore.setItemAsync('refresh', data.login.refresh)
           await SecureStore.setItemAsync('token', data.login.token)
            .then(() => {
                setUser({
                    id: data.login._id,
                    email: data.login.email,
                    token: data.login.token
                })
                navigation.replace("Home")
            })
            .catch(err => ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.CENTER))
       }
       saveUser()
    }
    
    if (error){
        ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
    }
    if(loading){ <Loading /> }

    return (
        <KeyboardAvoidingView style={[styles.wrapper]} >
            <View style={[Standard.wrapper_80]}>
                <TextInput
                    style={[Input.input]}
                    placeholder='Email Address'
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={[Input.input]}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={text => setPass(text)}
                    value={pass}
                />
            </View>
            <TouchableOpacity
                onPress={() => login()}
                style={[Btn.btn, Btn.purple]}
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