import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Btn from '../styles/Buttons'
import Standard from '../styles/Standard'
import * as SecureStore from 'expo-secure-store'

const SplashScreen = () => {

    const navigation = useNavigation()

    const handleSetup = () => {
        navigation.navigate("Create Account")
    }

    const clearURI = async () => {
        try{
            await SecureStore.deleteItemAsync('uri')
        }catch(error){
            console.error
        }
    }

    return (
        <View style={styles.wrapper} >
            <Text style={Standard.title}>Mílao Agápi</Text>
            <TouchableOpacity
                onPress={() => {}}
                style={[Btn.btn, Btn.purple]}
            >
                <Text style={[Btn.text, Btn.purple_text]}>
                    Join Partner 📷
                </Text>
            </TouchableOpacity>
            <View
                style={Btn.wrapper}
            >
                <TouchableOpacity
                    onPress={handleSetup}
                    style={[Btn.ghost, Btn.btn]}
                >
                    <Text style={[Btn.text, Btn.ghost_text]}>
                        Create Account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    style={[Btn.ghost, Btn.btn]}
                >
                    <Text style={[Btn.text, Btn.ghost_text]}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
                <TouchableOpacity
                    style={[Btn.btn, Btn.purple]}
                    onPress={() => clearURI()}
                >
                    <Text style={[Btn.purple_text]}>
                        Clear URI Storage
                    </Text>
            </TouchableOpacity>
        </View>
    )
    }

export default SplashScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})