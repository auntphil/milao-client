import { gql } from "@apollo/client";

const CREATE_USER = gql`
    mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            _id
            email
            refresh
            token
        }
    }
`
const LOGIN = gql`
    mutation Mutation($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
        _id
        email
        refresh
        token
    }
}`

const SEND_MESSAGE = gql`
    mutation Mutation($senderId: String!, $message: String!, $date: Float!, $extra: String!) {
        addMessage(senderID: $senderId, message: $message, date: $date, extra: $extra) {
            _id
        }
    }
`

const SEND_REACTION = gql`
    mutation Mutation($senderId: String!, $reaction: String!, $msgId: String!) {
        addReaction(senderID: $senderId, reaction: $reaction, msgID: $msgId) {
            _id
        }
    }
`

const REMOVE_REACTION = gql`
    mutation Mutation($removeReactionId: ID!) {
        removeReaction(id: $removeReactionId) {
        _id
        }
    }
`

export { CREATE_USER, LOGIN, SEND_MESSAGE, SEND_REACTION, REMOVE_REACTION }