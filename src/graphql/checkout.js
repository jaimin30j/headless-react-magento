import { gql } from 'graphql-request'

export const SET_GUEST_EMAIL = gql`
  mutation SetEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart { id email }
    }
  }
`
export const SET_SHIPPING_ADDRESS = gql`
  mutation SetShippingAddr($cartId: String!, $addr: CartAddressInput!) {
    setShippingAddressesOnCart(input: {
      cart_id: $cartId, shipping_addresses: [{ address: $addr }]
    }) {
      cart {
        shipping_addresses {
          available_shipping_methods {
            carrier_code method_code carrier_title method_title
            amount { value currency } available
          }
        }
      }
    }
  }
`
export const SET_SHIPPING_METHOD = gql`
  mutation SetShippingMethod($cartId: String!, $carrier: String!, $method: String!) {
    setShippingMethodsOnCart(input: {
      cart_id: $cartId
      shipping_methods: [{ carrier_code: $carrier, method_code: $method }]
    }) {
      cart {
        prices { grand_total { value currency } }
        shipping_addresses {
          selected_shipping_method { carrier_title method_title amount { value currency } }
        }
      }
    }
  }
`
export const SET_BILLING_ADDRESS = gql`
  mutation SetBillingAddr($cartId: String!, $sameAsShipping: Boolean!, $addr: CartAddressInput) {
    setBillingAddressOnCart(input: {
      cart_id: $cartId
      billing_address: { same_as_shipping: $sameAsShipping, address: $addr }
    }) {
      cart { billing_address { firstname lastname city } }
    }
  }
`
export const GET_PAYMENT_METHODS = gql`
  query GetPaymentMethods($cartId: String!) {
    cart(cart_id: $cartId) {
      available_payment_methods { code title }
      prices {
        subtotal_excluding_tax { value currency }
        applied_taxes          { amount { value currency } label }
        grand_total            { value currency }
      }
    }
  }
`
export const SET_PAYMENT_METHOD = gql`
  mutation SetPayment($cartId: String!, $code: String!) {
    setPaymentMethodOnCart(input: {
      cart_id: $cartId, payment_method: { code: $code }
    }) {
      cart { selected_payment_method { code title } }
    }
  }
`
export const PLACE_ORDER = gql`
  mutation PlaceOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      order { order_number }
      errors { message code }
    }
  }
`