import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'

import Standard from '../styles/Standard'
import Input from '../styles/Input'
import Btn from '../styles/Buttons'



const URIScreen = (props) => {

    const {uri, setUri, startConnection} = props

    const saveURI = async (uri) => {
        await SecureStore.setItemAsync('uri', uri)
        startConnection()
    }

    return (
        <KeyboardAvoidingView style={styles.wrapper} >
            <View style={Standard.wrapper_80}>
                <Text style={Standard.title}>Mílao Agápi</Text>
                <Text style={Standard.text}>You must designate a server before continuing.</Text>
                <TextInput
                    onChangeText={text => setUri(text)}
                    style={Input.input}
                    placeholder="Server Address"
                    value={uri}
                    />
            </View>
            <TouchableOpacity
                style={[Btn.btn, Btn.purple]}
                onPress={() => saveURI(uri)}
                >
                    <Text style={[Btn.purple_text]}>
                        Connect To Server
                    </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default URIScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})