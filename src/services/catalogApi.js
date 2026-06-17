import { baseApi } from './baseApi'
import gqlClient from '../utils/gqlClient'
import { GET_CATEGORY_PRODUCTS, GET_PRODUCT_DETAIL, GET_CATEGORIES } from '../graphql/catalog'

export const catalogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        getCategories: build.query({
            queryFn: async () => {
                const data = await gqlClient.request(GET_CATEGORIES)
                return { data }
            },
            keepUnusedDataFor: 300,   // categories rarely change — cache 5 min
        }),

        getCategoryProducts: build.query({
            queryFn: async (args) => {
                const data = await gqlClient.request(GET_CATEGORY_PRODUCTS, args)
                return { data }
            },
            keepUnusedDataFor: 60,
        }),

        getProductDetail: build.query({
            queryFn: async ({ urlKey }) => {
                const data = await gqlClient.request(GET_PRODUCT_DETAIL, { urlKey })
                return { data }
            },
            keepUnusedDataFor: 120,
        }),

    }),
})

export const {
    useGetCategoriesQuery,
    useGetCategoryProductsQuery,
    useGetProductDetailQuery,
} = catalogApi