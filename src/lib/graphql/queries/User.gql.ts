import { gql } from 'urql'

const USER_FRAGMENT = gql`
  fragment User_user on User {
    id
    username
    email
    role
  }
`

export const USER_ME_QUERY = gql`
  query GetMe {
    me {
        ...User_user
    }
  }
  ${USER_FRAGMENT}
`
