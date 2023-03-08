import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import Btn from '../styles/Buttons'
import Input from '../styles/Input'
import Standard from '../styles/Standard'     
import AuthContext from '../context/AuthContext'

const Setup = () => {
    //Setup Navigation
    const navigation = useNavigation()

    //Get Context
    const {baseUrl, saveBaseUrl} = useContext(AuthContext)

    //State
    const [newUrl, setNewUrl] = useState(baseUrl)


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
                        onChangeText={text => setNewUrl(text)}
                        style={[Input.default]}
                        placeholder="Server Address"
                        value={newUrl}
                        />
                    <TouchableOpacity
                        style={[Btn.default, Btn.purple]}
                        onPress={() => saveBaseUrl(newUrl)}
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