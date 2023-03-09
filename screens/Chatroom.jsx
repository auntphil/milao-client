import { useEffect, useState, useCallback, useContext } from "react"
import { GiftedChat } from 'react-native-gifted-chat'
import { useNavigation } from "@react-navigation/native";

//Context
import AuthContext from '../context/AuthContext.js';

//Wrappers
import Loading from "./LoadingScreen";

const Chatroom = () => {
  //Navigation
  const navigation = useNavigation()

  //Get Context
  const {user} = useContext(AuthContext)
  
  //State
    const [loading, setLoading] = useState(true)
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        setMessages([
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ])
        setLoading(false)
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
                _id: user.id,
            }}
        />
    )
}

export default Chatroom