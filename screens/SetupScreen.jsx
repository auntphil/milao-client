import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { randomString } from '../utils/helpers'
import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'

const SetupScreen = () => {

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [serverAddr, setServerAddr] = useState("")
    const [eKey, setEKey] = useState("")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [pass, setPass] = useState("")
    const [pass2, setPass2] = useState("")

    const handleRandomKey = () => {
        setEKey(randomString(128))
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
            <View style={[styles.section_wrapper]}>
                <Text style={[styles.header]}>Connection</Text>
                <TextInput
                    style={[styles.input]}
                    placeholder='Server Address'
                    value={serverAddr}
                    onChange={text => setServerAddr(text)}
                />
                <View style={[styles.enc_wrapper]}>
                    <TextInput
                        style={[styles.input, styles.input_btn_right]}
                        placeholder='Encryption Key'
                        value={eKey}
                        onChange={text => setEKey(text)}
                    />
                    <TouchableOpacity
                        style={[styles.btn, styles.btn_purple, styles.btn_right]}
                        onPress={handleRandomKey}
                    >
                        <Text style={[styles.btn_purple_text]}>Random</Text>
                    </TouchableOpacity>
                </View>
            </View>
                <Text style={[styles.header]}>Account</Text>
            <View style={[Standard.wrapper_80]}>
                <TextInput
                    style={[Input.input]}
                    placeholder='Email Address'
                    value={email}
                    onChange={text => setEmail(text)}
                />
                <TextInput
                    style={[Input.input]}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={pass}
                    onChange={text => setPass(text)}
                />
                <TextInput
                    style={[Input.input]}
                    secureTextEntry={true}
                    placeholder='Verify Password'
                    value={pass2}
                    onChange={text => setPass2(text)}
                />
            </View>
            <TouchableOpacity
                onPress={() => {}}
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