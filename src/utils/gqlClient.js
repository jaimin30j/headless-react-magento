import { GraphQLClient } from 'graphql-request'

const gqlClient = new GraphQLClient(`${window.location.origin}/graphql`)

export default gqlClient