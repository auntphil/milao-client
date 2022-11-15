import { gql } from "@apollo/client"

const GET_USER = gql`
    query Query($userId: ID!) {
    user(id: $userId) {
        email
    }
}`

const GET_MESSAGES = gql`
query Query {
  messages {
    _id
    date
    message
    reaction {
      _id
      reaction
    }
    user {
      _id
    }
  }
}`

export { GET_USER, GET_MESSAGES }