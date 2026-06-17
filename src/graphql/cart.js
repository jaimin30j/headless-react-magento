import { gql } from 'graphql-request'

const CART_FRAGMENT = gql`
  fragment CartData on Cart {
    id
    total_quantity
    items {
      uid quantity
      product { sku name url_key small_image { url } }
      prices { row_total { value currency } price { value currency } }
      ... on ConfigurableCartItem {
        configurable_options { option_label value_label }
      }
    }
    prices {
      subtotal_excluding_tax { value currency }
      applied_taxes          { amount { value currency } label }
      discounts              { amount { value currency } label }
      grand_total            { value currency }
    }
    applied_coupons { code }
  }
`

export const CREATE_CART = gql`mutation { createEmptyCart }`
export const GET_CART = gql`${CART_FRAGMENT} query GetCart($id: String!) { cart(cart_id: $id) { ...CartData } }`
export const ADD_TO_CART = gql`
  mutation AddToCart($cartId: String!, $sku: String!, $qty: Float!, $opts: [EnteredOptionInput!]) {
    addProductsToCart(cartId: $cartId, cartItems: [{ sku: $sku, quantity: $qty, entered_options: $opts }]) {
      cart { id total_quantity }
      user_errors { code message }
    }
  }
`
export const UPDATE_ITEM = gql`
  mutation UpdateItem($cartId: String!, $uid: ID!, $qty: Float!) {
    updateCartItems(input: { cart_id: $cartId, cart_items: [{ cart_item_uid: $uid, quantity: $qty }] }) {
      cart { id total_quantity }
    }
  }
`
export const REMOVE_ITEM = gql`
  mutation RemoveItem($cartId: String!, $uid: ID!) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $uid }) {
      cart { id total_quantity }
    }
  }
`
export const APPLY_COUPON = gql`
  mutation ApplyCoupon($cartId: String!, $code: String!) {
    applyCouponToCart(input: { cart_id: $cartId, coupon_code: $code }) {
      cart { applied_coupons { code } prices { grand_total { value currency } } }
    }
  }
`
export const REMOVE_COUPON = gql`
  mutation RemoveCoupon($cartId: String!) {
    removeCouponFromCart(input: { cart_id: $cartId }) {
      cart { applied_coupons { code } prices { grand_total { value currency } } }
    }
  }
`