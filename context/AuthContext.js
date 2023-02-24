import {createContext, useEffect, useState} from 'react'
import * as SecureStore from 'expo-secure-store'
import jwt_decode from "jwt-decode";
import { useNavigation } from '@react-navigation/native';


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    const [authTokens, setAuthTokens] = useState("")
    const [user, setUser] = useState("")
    const [uri, setUri] = useState("")
    const [loading, setLoading] = useState(true)
    
    //Navigation
    const navigation = useNavigation()

    const saveUri = async (uri) => {
        setUri(uri)
        await SecureStore.setItemAsync('uri', uri)
    }

    const userLogin = async (username, password) => {

        //Attempting to Login as user
        const response = await fetch(`${uri}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password })
        })
        const data =  await response.json()

        if(response.status === 200){
            console.log(data.access)
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            await SecureStore.setItemAsync('authTokens', JSON.stringify(data))
            return true
        }else{
            console.log('Unable to log in')
            return false
        }
    }

    const contextData = {
        user:user,
        setUser:setUser,
        authTokens:authTokens,
        uri:uri,
        saveUri:saveUri,
        userLogin:userLogin
    }

    useEffect(() => {
        const intialValues = async () => {
            const authTokens = await SecureStore.getItemAsync('authTokens') ? JSON.parse( await SecureStore.getItemAsync('authTokens')) : null
            const uri = await SecureStore.getItemAsync('uri') ? await SecureStore.getItemAsync('uri') : null
            setAuthTokens(authTokens)
            setUri(uri)
        }

        intialValues()
    },[])

    useEffect(() => {
        if(authTokens){
            try{
                setUser(jwt_decode(authTokens.access))
            } catch (err) {
                console.error(err)
                setAuthTokens(null)
            }
        }
        setLoading(false)
    },[authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}