import { baseApi } from './baseApi'
import gqlClient from '../utils/gqlClient'
import { gql } from 'graphql-request'
import {
    SET_GUEST_EMAIL, SET_SHIPPING_ADDRESS, SET_SHIPPING_METHOD,
    SET_BILLING_ADDRESS, GET_PAYMENT_METHODS, SET_PAYMENT_METHOD, PLACE_ORDER
} from '../graphql/checkout'

export const checkoutApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        setGuestEmail: build.mutation({ queryFn: async (a) => ({ data: await gqlClient.request(SET_GUEST_EMAIL, a) }) }),
        //setShippingAddress: build.mutation({ queryFn: async (a) => ({ data: await gqlClient.request(SET_SHIPPING_ADDRESS, a) }) }),
        // setShippingMethod: build.mutation({ queryFn: async (a) => ({ data: await gqlClient.request(SET_SHIPPING_METHOD, a) }) }),
        setShippingAddress: build.mutation({
            queryFn: async ({ cartId, address }) => {
                try {
                    const cleanAddr = {
                        firstname: address.firstname,
                        lastname: address.lastname,
                        street: address.street.filter(s => s && s.trim() !== ''),
                        city: address.city,
                        region: address.region_code || address.region || '',  // ← string not region_code
                        postcode: address.postcode || '',
                        country_code: address.country_code,
                        telephone: address.telephone,
                        save_in_address_book: false,
                        // DO NOT include region_code — not a valid CartAddressInput field
                    }

                    const data = await gqlClient.request(gql`
                        mutation SetShippingAddr($cartId: String!, $cleanAddr: CartAddressInput!) {
                            setShippingAddressesOnCart(input: {
                                cart_id: $cartId
                                shipping_addresses: [{ address: $cleanAddr }]
                            }) {
                                cart {
                                    shipping_addresses {
                                        available_shipping_methods {
                                            carrier_code method_code
                                            carrier_title method_title
                                            amount { value currency }
                                            available
                                        }
                                    }
                                }
                            }
                        }
                    `, { cartId, cleanAddr })

                    return { data }
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: error.message } }
                }
            },
        }),
        setShippingMethod: build.mutation({
            queryFn: async ({ cartId, carrierCode, methodCode }) => {
                try {
                    const data = await gqlClient.request(gql`
                        mutation SetShippingMethod(
                            $cartId: String!
                            $carrier: String!
                            $method: String!
                        ) {
                            setShippingMethodsOnCart(input: {
                                cart_id: $cartId
                                shipping_methods: [{
                                    carrier_code: $carrier
                                    method_code: $method
                                }]
                            }) {
                                cart {
                                    shipping_addresses {
                                        selected_shipping_method {
                                            carrier_title
                                            method_title
                                            amount { value currency }
                                        }
                                    }
                                    prices {
                                        grand_total { value currency }
                                    }
                                }
                            }
                        }
                    `, { cartId, carrier: carrierCode, method: methodCode })
                    return { data }
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: error.message } }
                }
            },
            invalidatesTags: ['Cart'],
        }),
        setBillingAddress: build.mutation({
            queryFn: async ({ cartId, sameAsShipping, address }) => {
                try {
                    if (sameAsShipping) {
                        // No address variable at all
                        const data = await gqlClient.request(gql`
                            mutation SetBillingSame($cartId: String!) {
                                setBillingAddressOnCart(input: {
                                    cart_id: $cartId
                                    billing_address: { same_as_shipping: true }
                                }) {
                                    cart {
                                        billing_address { firstname lastname city }
                                    }
                                }
                            }
                        `, { cartId })
                        return { data }

                    } else {
                        // Full address, no same_as_shipping key
                        const cleanAddr = {
                            firstname: address.firstname,
                            lastname: address.lastname,
                            street: address.street.filter(s => s && s.trim() !== ''),
                            city: address.city,
                            postcode: address.postcode || '',
                            country_code: address.country_code,
                            telephone: address.telephone,
                            save_in_address_book: false,
                            // only include region if user filled it in
                            ...(address.region_code && { region: address.region_code }),
                        }
                        const data = await gqlClient.request(gql`
                            mutation SetBillingAddr($cartId: String!, $addr: CartAddressInput!) {
                                setBillingAddressOnCart(input: {
                                    cart_id: $cartId
                                    billing_address: { address: $addr }
                                }) {
                                    cart {
                                        billing_address { firstname lastname city }
                                    }
                                }
                            }
                        `, { cartId, addr: cleanAddr })
                        return { data }
                    }
                } catch (error) {
                    return { error: { status: 'CUSTOM_ERROR', error: error.message } }
                }
            },
        }),
        getPaymentMethods: build.query({
            queryFn: async (cartId) => ({ data: await gqlClient.request(GET_PAYMENT_METHODS, { cartId }) }),
            keepUnusedDataFor: 0,
        }),
        setPaymentMethod: build.mutation({ queryFn: async (a) => ({ data: await gqlClient.request(SET_PAYMENT_METHOD, a) }) }),
        placeOrder: build.mutation({
            queryFn: async (a) => ({ data: await gqlClient.request(PLACE_ORDER, a) }),
            invalidatesTags: ['Cart'],
        }),
    }),
})

export const {
    useSetGuestEmailMutation,
    useSetShippingAddressMutation,
    useSetShippingMethodMutation,
    useSetBillingAddressMutation,
    useGetPaymentMethodsQuery,
    useSetPaymentMethodMutation,
    usePlaceOrderMutation,
} = checkoutApi