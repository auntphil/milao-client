import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../Schema/Mutation'

const SetupScreen = ({setUser}) => {

    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    const [userData, {data, loading, error}] = useMutation(CREATE_USER)

    const createUser = () => {
        if(pass !== pass2){
            ToastAndroid.showWithGravity("Passwords Do Not Match.", ToastAndroid.LONG, ToastAndroid.CENTER)
            return
        }
        if(pass.length < 5){
            ToastAndroid.showWithGravity("Password Must Be Atleast 5 Characters", ToastAndroid.LONG, ToastAndroid.CENTER)
            return
        }
        userData({variables: {registerInput: {email: email, password: pass}}})
    }

    if(typeof data !== 'undefined'){
       const saveUser = async () => {
           SecureStore.setItemAsync('refresh', data.registerUser.refresh)
            .then(() => {
                setUser({
                    id: data.registerUser._id,
                    email: data.registerUser.email,
                    token: data.registerUser.token
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
    if(loading){
        return(
            <View>
                <ActivityIndicator size='large' />
            </View>
        )
    }

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
                <TextInput
                    style={[Input.input]}
                    secureTextEntry={true}
                    placeholder='Verify Password'
                    onChangeText={text => setPass2(text)}
                    value={pass2}
                />
            </View>
            <TouchableOpacity
                onPress={() => createUser()}
                style={[Btn.btn, Btn.purple]}
            >
                <Text style={[Btn.text, Btn.purple_text]}>
                    Create Account
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
            
    )
}

export default SetupScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})