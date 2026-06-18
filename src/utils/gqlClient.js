import { GraphQLClient } from 'graphql-request'

const gqlClient = new GraphQLClient(
    import.meta.env.VITE_GRAPHQL_URL
)

export default gqlClient
