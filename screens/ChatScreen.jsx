import { useState } from "react"
import { KeyboardAvoidingView, Text } from "react-native"
import ChatBubble from "./components/ChatBubble"
import Loading from "./LoadingScreen"

const ChatScreen = () => {
    const [loading, setLoading] = useState(true)
    if(loading) return <Loading />

    return (
        <KeyboardAvoidingView>
            {
                <ChatBubble message={['message','message2']} />
            }
        </KeyboardAvoidingView>
    )
}

export default ChatScreen