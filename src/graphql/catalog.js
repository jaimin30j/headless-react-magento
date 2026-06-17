import { gql } from 'graphql-request'

// Option B — filter by category_id (more reliable)
export const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($categoryId: String!, $pageSize: Int!, $currentPage: Int!) {
    products(
      filter: { category_id: { eq: $categoryId } }
      pageSize: $pageSize
      currentPage: $currentPage
    ) {
      total_count
      items {
        id sku name url_key stock_status
        price_range {
          minimum_price {
            final_price { value currency }
          }
        }
        small_image { url label }
      }
    }
  }
`

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($urlKey: String!) {
    products(filter: { url_key: { eq: $urlKey } }) {
      items {
        id sku name url_key stock_status
        description { html }
        short_description { html }
        price_range {
          minimum_price {
            final_price   { value currency }
            regular_price { value currency }
            discount      { amount_off percent_off }
          }
        }
        media_gallery { url label disabled }
        categories { id name url_key }
        ... on ConfigurableProduct {
          configurable_options {
            id label attribute_code
            values { uid label }
          }
          variants {
            attributes { uid code value_index }
            product { sku stock_status price_range { minimum_price { final_price { value currency } } } }
          }
        }
      }
    }
  }
`

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories(filters: { parent_id: { eq: "2" } }) {
      items {
        id name url_key image product_count
      }
    }
  }
`