import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Query } from 'react-apollo'
import client from './client'
import { SEARCH_REPOSITORIES } from './graphql'

const DEFAULT_STATE = {
  first: 5,
  after: null,
  last: null,
  before: null,
  query: "フロントエンドエンジニア"
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = DEFAULT_STATE
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (e) => {
    this.setState({
      ...DEFAULT_STATE,
      query: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
  }

  render() {
    const { query, first, last, before, after } = this.state

    console.log({query})

    return (
      <ApolloProvider client={client}>
        <form onSubmit={this.handleSubmit}>
          <input value={query} onChange={this.handleChange} />
        </form>

        <Query
          query={SEARCH_REPOSITORIES}
          variables={{ query, first, last, before, after }}>
          {
            ({ loading, error, data }) => {
              if (loading) return 'loading...'
              if (error) return `error! ${error.message}`

              const search = data.search
              const repositoryCount = search.repositoryCount
              const repositoryUnit = repositoryCount === 1 ? 'repository' : 'repositories'
              const title = `github repositories search results - ${data.search.repositoryCount} ${repositoryUnit}`
              return <h2>{title}</h2>
            }
          }
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
