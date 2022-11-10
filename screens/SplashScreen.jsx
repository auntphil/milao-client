import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {

    const navigation = useNavigation()

    const handleSetup = () => {
        navigation.navigate("Create Account")
    }

    return (
        <View
            style={styles.wrapper}
        >
            <Text style={styles.title}>Mílao Agápi</Text>
            <TouchableOpacity
                onPress={() => {}}
                style={[styles.btn, styles.btn_purple]}
            >
                <Text style={[styles.btn_text, styles.btn_purple_text]}>
                    Join Partner 📷
                </Text>
            </TouchableOpacity>
            <View
                style={styles.btn_wrapper}
            >
                <TouchableOpacity
                    onPress={handleSetup}
                    style={[styles.btn_ghost, styles.btn]}
                >
                    <Text style={[styles.btn_text, styles.btn_ghost_text]}>
                        Create Account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {}}
                    style={[styles.btn_ghost, styles.btn]}
                >
                    <Text style={[styles.btn_text, styles.btn_ghost_text]}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
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
    title: {
        fontSize: 54,
        fontWeight: '700',
        marginBottom: 15
    },
    btn_wrapper: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        width: '49%',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    btn_text: {
        fontWeight: '700',
        color: 'white',
    },
    btn_ghost: {
        borderWidth: 2,
        borderColor: 'purple',
        backgroundColor: 'white',
    },
    btn_ghost_text: {
        color: 'purple',
    },
    btn_purple: {
        backgroundColor: 'purple',
        width: '70%',
        marginBottom: 15,
    },
    btn_purple_text: {
        fontSize: 17,
        fontWeight: '700',
        color: 'white'
    }
})