import { GraphQLClient } from 'graphql-request'

const GRAPHQL_URL = import.meta.env
    ? `${window.location.origin}/graphql`
    : import.meta.env.VITE_GRAPHQL_URL

if (!GRAPHQL_URL) {
    throw new Error('VITE_GRAPHQL_URL is not configured')
}

const gqlClient = new GraphQLClient(GRAPHQL_URL)

export default gqlClient

