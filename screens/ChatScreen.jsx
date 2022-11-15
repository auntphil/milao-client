import { useQuery } from "@apollo/client"
import { KeyboardAvoidingView, Text } from "react-native"
import { GET_MESSAGES } from "../Schema/Query"
import ChatBubble from "./components/ChatBubble"
import Loading from "./LoadingScreen"

const ChatScreen = () => {
    const {data, loading, error} = useQuery(GET_MESSAGES)

    if(loading) return <Loading />
    if(error) console.error(error.message)

    return (
        <KeyboardAvoidingView>
            {
                data.messages.map( msg => <ChatBubble message={msg} /> )
            }
        </KeyboardAvoidingView>
    )
}

export default ChatScreen