import { KeyboardAvoidingView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

//Context
import AuthContext from '../context/AuthContext.js';

//Styles
import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'

//Views
import Loading from './LoadingScreen'

const CreateAccount = () => {

    //Get Context
    const {userCreate} = useContext(AuthContext)

    //Navigation
    const navigation = useNavigation()

    //State
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("andrew")
    const [pass, setPass] = useState("password")
    const [pass2, setPass2] = useState("password")
    
    const handleCreateUser = async () => {
        setLoading(true)
        if(pass !== pass2){
            console.error("Passwords Do Not Match.")
            setLoading(false)
            return
        }
        if(pass.length < 5){
            console.error("Password Must Be Atleast 6 Characters")
            setLoading(false)
            return
        }

        const {response, data} = await userCreate(username, pass)
        if(response.status === 200){
            navigation.replace('Home')
        } else {
            console.error(data.message)
            setLoading(false)
        }
    }

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
                onPress={() => handleCreateUser()}
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