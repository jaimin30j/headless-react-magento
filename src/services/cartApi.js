import { baseApi } from './baseApi'
import gqlClient from '../utils/gqlClient'
import { CREATE_CART, GET_CART, ADD_TO_CART, UPDATE_ITEM, REMOVE_ITEM, APPLY_COUPON, REMOVE_COUPON } from '../graphql/cart'

export const cartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({

        createCart: build.mutation({
            queryFn: async () => {
                const data = await gqlClient.request(CREATE_CART)
                return { data }
            },
        }),

        getCart: build.query({
            queryFn: async (cartId) => {
                if (!cartId) return { data: null }
                const data = await gqlClient.request(GET_CART, { id: cartId })
                return { data }
            },
            providesTags: ['Cart'],
            keepUnusedDataFor: 0,    // cart must always be fresh
        }),

        addToCart: build.mutation({
            queryFn: async (args) => {
                const data = await gqlClient.request(ADD_TO_CART, args)
                return { data }
            },
            invalidatesTags: ['Cart'],  // triggers getCart to refetch
        }),

        updateItem: build.mutation({
            queryFn: async (args) => {
                const data = await gqlClient.request(UPDATE_ITEM, args)
                return { data }
            },
            invalidatesTags: ['Cart'],
        }),

        removeItem: build.mutation({
            queryFn: async (args) => {
                const data = await gqlClient.request(REMOVE_ITEM, args)
                return { data }
            },
            invalidatesTags: ['Cart'],
        }),

        applyCoupon: build.mutation({
            queryFn: async (args) => {
                const data = await gqlClient.request(APPLY_COUPON, args)
                return { data }
            },
            invalidatesTags: ['Cart'],
        }),

        removeCoupon: build.mutation({
            queryFn: async (args) => {
                const data = await gqlClient.request(REMOVE_COUPON, args)
                return { data }
            },
            invalidatesTags: ['Cart'],
        }),

        clearCart: build.mutation({
            queryFn: async ({ cartId, items }) => {
                // Magento has no clearCart mutation — remove all items one by one
                await Promise.all(
                    items.map((item) =>
                        gqlClient.request(gql`
                        mutation RemoveItem($cartId: String!, $uid: ID!) {
                            removeItemFromCart(input: {
                            cart_id: $cartId
                            cart_item_uid: $uid
                            }) { cart { id } }
                        }
            `, { cartId, uid: item.uid })
                    )
                )
                return { data: { cleared: true } }
            },
            invalidatesTags: ['Cart'],
        }),

    }),
})

export const {
    useCreateCartMutation,
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateItemMutation,
    useRemoveItemMutation,
    useApplyCouponMutation,
    useRemoveCouponMutation,
    useClearCartMutation,
} = cartApi