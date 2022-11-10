import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { randomString } from '../utils/helpers'

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
            <View style={[styles.section_wrapper]}>
                <Text style={[styles.header]}>Account</Text>
                <TextInput
                    style={[styles.input]}
                    placeholder='Email Address'
                    value={email}
                    onChange={text => setEmail(text)}
                />
                <TextInput
                    style={[styles.input]}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={pass}
                    onChange={text => setPass(text)}
                />
                <TextInput
                    style={[styles.input]}
                    secureTextEntry={true}
                    placeholder='Verify Password'
                    value={pass2}
                    onChange={text => setPass2(text)}
                />
            </View>
            <TouchableOpacity
                onPress={() => {}}
                style={[styles.btn, styles.btn_purple]}
            >
                <Text style={[styles.btn_text, styles.btn_purple_text]}>
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
    enc_wrapper: {
        flexDirection: 'row',
        width: '100%', 
        marginVertical: 5
    },
    btn: {
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    btn_purple: {
        backgroundColor: 'purple',
        width: '70%',
        marginBottom: 15,
    },
    btn_purple_text: {
        fontSize: 17,
        fontWeight: '700',
        color: 'white',
    },
    btn_right: {
        width: '30%',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        padding: 0,
        justifyContent: 'center',
        height: 35,
        marginBottom: 0
    },
    section_wrapper: {
        width: '80%',
        marginBottom: 5,
    },
    header: {
        fontWeight:'700',
        fontSize: 24,
    },
    input: {
        width: '100%',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 0,
        paddingHorizontal: 15,
        marginVertical: 5,
        height: 35
    },
    input_btn_right: {
        width: '70%',
        marginVertical: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
        paddingRight: 7
    }
})