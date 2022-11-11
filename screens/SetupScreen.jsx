import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../Schema/Mutation'

const SetupScreen = () => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [serverAddr, setServerAddr] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")
    const [userData, {data, createUserLoading, error}] = useMutation(CREATE_USER)

    const createUser = () => {
        if(pass === pass2){
            userData({variables: {registerInput: {email: email, password: pass}}})
        }else{
            console.error('Passwords do not match')
        }
    }

    console.log(data)

    if (error) console.error(error);
    if(loading || createUserLoading){
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