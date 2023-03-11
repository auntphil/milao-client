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
    const [sent, setSent] = useState([])
    
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

    const sendMessage = (msgs) => {
      api('/chatrooms', 'POST', msgs)
      .then(({response,data}) => {
        if(response.status === 200){
          //Message Sent Properly
          setSent( previousSent => [...previousSent, msgs[0]._id])
        }else{
          console.log('Did Not Send')
          //TODO When Not Saved
        }
      })
      .catch(err => {
        console.log('Error Sending')
      })
    }

    const onSend = async (msgs = []) => {
        msgs.map( (msg, index) => {
          msgs[index].pending = true
        })
        setMessages(previousMessages => GiftedChat.append(previousMessages, msgs))
        sendMessage(msgs)
      }

    useEffect(() => {
      try{
        if(sent.length > 0){
          let updateSent = [...sent]
          let updateMsg = [...messages]
          updateSent.map( (id, index) => {
            const msgIndex = updateMsg.findIndex( obj => obj._id == id )
            if(msgIndex >= 0){
              updateMsg[msgIndex].sent = true
              updateMsg[msgIndex].pending = false
              updateSent.splice(index,1)
              setSent(updateSent)
              setMessages(updateMsg)
            }
          })
        }
      }catch(err){
        console.error(err)
      }
    },[messages,sent])
  

    if(loading) return <Loading />
    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            showUserAvatar={true}
            multiline ={false}
            user={{
                _id: user._id,
            }}
        />
    )
}

export default Chatroom