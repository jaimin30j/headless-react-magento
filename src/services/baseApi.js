import { createApi } from '@reduxjs/toolkit/query/react'
import gqlClient from '../utils/gqlClient'

// Custom baseQuery that uses graphql-request
const graphqlBaseQuery = () => async () => ({ data: null })

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: graphqlBaseQuery,
    tagTypes: ['Cart'],          // Cart tag → mutations invalidate → getCart refetches
    endpoints: () => ({}),
    keepUnusedDataFor: 60,       // default: cache for 60s
})