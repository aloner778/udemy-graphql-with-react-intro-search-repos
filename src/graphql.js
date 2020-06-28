import gql from 'graphql-tag'

export const ME = gql`
  query me {
    user(login: "aloner778") {
      name
      avatarUrl
    }
  }
`