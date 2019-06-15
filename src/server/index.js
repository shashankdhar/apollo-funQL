const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
const { gql } = require('apollo-server')

const baseURL = `http://www.boredapi.com/api`

const typeDefs = gql`
  type Suggestion {
    key: ID
    activity: String!
    type: String!
    price: String!
    accessibility: String!
    link: String!
  }
  type Query {
    suggestion(key: ID!): Suggestion
    suggestions: Suggestion
  }
`;

const resolvers = {
  Query: {
    suggestions: () => {
      return fetch(`${baseURL}/activity/`).then(res => res.json())
    },
    suggestion: (parent, args) => {
      const { key } = args
      return fetch(`${baseURL}/activity?key=${key}`).then(res => res.json())
    }
  }
}

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))