import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const navigation = useNavigation()

    const handleLogout = () => {
        navigation.replace("Splash")
    }

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
        >
        <Text>Home Screen</Text>
        <TouchableOpacity
                    onPress={handleLogout}
                    style={styles.button}
                >
                    <Text style={styles.btn_text}>
                        Logout
                    </Text>
                </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '65%',
        padding: 15,
        borderRadius: 15,
        backgroundColor: 'purple',
        alignItems: 'center'
    },
    btn_text: {
        fontWeight: '700',
        color: 'white',
    }
})