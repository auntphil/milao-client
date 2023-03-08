import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

//Context
import AuthContext from '../context/AuthContext.js';

//Wrappers
import useFetch from '../utils/useFetch.js';
import Loading from './LoadingScreen.jsx';

const HomeScreen = () => {
    //Navigation
    const navigation = useNavigation()

    //API
    const api = useFetch()

    //Get Context
    const {user, userLogout} = useContext(AuthContext)
    
    //State
    const [chatrooms, setChatrooms] = useState([])
    const [loading, setLoading] = useState(false)

    const handleLogout = () => {
        setLoading(true)
        userLogout()
    }

    useEffect(() => {
        getChatrooms()
    },[])

    const getChatrooms = async () => {
        const {response, data } = await api('/chatrooms', 'GET')

        if(response.status===200){
            setChatrooms(data)
        }
    }

    if(loading) return <Loading />

    return (
        <KeyboardAvoidingView
            style={styles.wrapper}
        >
            <Text>Home Screen</Text>
            <Text>User: {user.displayname ? user.displayname : user.username}</Text>
            {chatrooms.map( room => <Text key={room.chatroom_id}>{room.title}</Text>)}
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