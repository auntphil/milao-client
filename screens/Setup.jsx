import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'

import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'     

const Setup = (props) => {

    const {uri, setUri} = props

    const navigation = useNavigation()

    const saveURI = async (uri) => {
        await SecureStore.setItemAsync('uri', uri)
    }

    return (
        <View style={Standard.wrapper} >
            <Text style={Standard.title}>Mílao Agápi</Text>
            <TouchableOpacity
                onPress={() => {}}
                style={[Btn.default, Btn.purple]}
            >
                <Text style={[Btn.text, Btn.purple_text]}>
                    Join Partner 📷
                </Text>
            </TouchableOpacity>
            <View
                style={Btn.wrapper}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Create Account")}
                    style={[Btn.ghost, Btn.default]}
                >
                    <Text style={[Btn.text, Btn.ghost_text]}>
                        Create Account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={[Btn.ghost, Btn.default]}
                >
                    <Text style={[Btn.text, Btn.ghost_text]}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView>
                <Text style={Standard.text}>You must designate a server before continuing.</Text>
                <View>
                    <TextInput
                        onChangeText={text => setUri(text)}
                        style={[Input.default]}
                        placeholder="Server Address"
                        value={uri}
                        />
                    <TouchableOpacity
                        style={[Btn.default, Btn.purple]}
                        onPress={() => saveURI(uri)}
                        >
                            <Text style={[Btn.purple_text]}>
                                Save
                            </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
    }

export default Setup

const styles = StyleSheet.create({
    
})