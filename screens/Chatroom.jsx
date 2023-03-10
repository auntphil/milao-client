import { useEffect, useState, useCallback, useContext } from "react"
import { GiftedChat } from 'react-native-gifted-chat'
import { useNavigation } from "@react-navigation/native";

//Context
import AuthContext from '../context/AuthContext.js';

//Wrappers
import Loading from "./LoadingScreen";
import useFetch from "../utils/useFetch.js";

const Chatroom = () => {
  //Navigation
  const navigation = useNavigation()

  //API
  const api = useFetch()

  //Get Context
  const {user} = useContext(AuthContext)
  
  //State
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
      const getChatrooms = async()=>{
        const {response, data } = await api(`/chatrooms/1`, 'GET')
          if( response.status === 200){
            setMessages(data)
            setLoading(false)
          }else{
            navigation.goBack()
          }
      }
      getChatrooms()
    },[])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      }, [])
    
    if(loading) return <Loading />
    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: user._id,
            }}
        />
    )
}

export default Chatroom