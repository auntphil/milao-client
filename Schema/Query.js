import { gql } from "@apollo/client"

const GET_USER = gql`
    query Query($userId: ID!) {
    user(id: $userId) {
        email
    }
}`

export { GET_USER }