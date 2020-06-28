import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import client from './client'
import { ME } from './graphql'

function App() {
  return (
    <ApolloProvider client={client}>
      hello
      <Query query={ME}>
        {
          ({ loading, error, data }) => {
            if (loading) return 'loading...'
            if (error) return `error! ${error.message}`

            return <div>{data.user.name}</div>
          }
        }
      </Query>
    </ApolloProvider>
  );
}

export default App;
