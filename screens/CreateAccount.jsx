import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

//Styles
import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'

//Views
import Loading from './LoadingScreen'

const CreateAccount = (props) => {

    const {uri} = props

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()
    const [username, setUsername] = useState("andrew")
    const [pass, setPass] = useState("password")
    const [pass2, setPass2] = useState("password")

    const createUser = async () => {
        if(pass !== pass2){
            ToastAndroid.showWithGravity("Passwords Do Not Match.", ToastAndroid.LONG, ToastAndroid.CENTER)
            return
        }
        if(pass.length < 5){
            ToastAndroid.showWithGravity("Password Must Be Atleast 5 Characters", ToastAndroid.LONG, ToastAndroid.CENTER)
            return
        }

        //Attempting to Create a user
        fetch(`${uri}/user/signup`, {
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
                ToastAndroid.showWithGravity("User Created" , ToastAndroid.LONG, ToastAndroid.CENTER)
                navigation.replace('Home')
            }
        })
        .catch( err => ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.CENTER) )

        
    }

    if(typeof data !== 'undefined'){
       const saveUser = async () => {
           SecureStore.setItemAsync('refresh', data.registerUser.refresh)
           SecureStore.setItemAsync('token', data.registerUser.token)
            .then(() => {
                navigation.replace("Home")
            })
            .catch(err => ToastAndroid.showWithGravity(err, ToastAndroid.LONG, ToastAndroid.CENTER))
       }
       saveUser()
    }
    
    if (error) ToastAndroid.showWithGravity(error.message, ToastAndroid.LONG, ToastAndroid.CENTER)
    if (loading) return <Loading />

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
                <TextInput
                    style={[Input.default]}
                    secureTextEntry={true}
                    placeholder='Verify Password'
                    onChangeText={text => setPass2(text)}
                    value={pass2}
                />
            </View>
            <TouchableOpacity
                onPress={() => createUser()}
                style={[Btn.default, Btn.purple]}
            >
                <Text style={[Btn.text, Btn.purple_text]}>
                    Create Account
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
            
    )
}

export default CreateAccount

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})