# 🚀 Headless React Magento Store

A modern **Headless Commerce Storefront** built with **React.js** and powered by **Magento 2 GraphQL APIs**, delivering a fast, scalable, and seamless eCommerce experience.

This project demonstrates my expertise in **Adobe Commerce (Magento 2)**, **GraphQL**, **React.js**, **Redux Toolkit**, and modern frontend development practices for building high-performance headless storefronts.

---

## 🌐 Live Demo

🔗 **Demo URL:** https://your-vercel-app-url.vercel.app

## ✨ Features

* ⚡ Headless Commerce Architecture
* 🛍️ Magento 2 GraphQL Integration
* 📦 Product Listing Page (PLP)
* 🛒 Shopping Cart Functionality
* 🛒 Checkout Page
* 📱 Fully Responsive Design
* 🚀 Fast Client-Side Navigation
* 💀 Skeleton Loaders for Better UX
* 🔥 Toast Notifications
* 🎯 State Management with Redux Toolkit
* 🔄 Dynamic Data Fetching using GraphQL
* 🌙 Modern UI built with TailwindCSS

---

## 🏗️ Tech Stack

### Frontend

* React.js
* React Router
* React Redux Toolkit
* TailwindCSS
* GraphQL Request
* React Loading Skeleton
* React Hot Toast

### Backend

* Magento 2 (Adobe Commerce)
* Magento GraphQL APIs

---

## 📁 Project Structure

```bash
headless-react-magento/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   └── store.js
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MainLayout.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductCardSkeleton.jsx
│   │   │
│   │   ├── checkout/
│   │   │   ├── ContactStep.jsx
│   │   │   ├── ShippingStep.jsx
│   │   │   ├── PaymentStep.jsx
│   │   │   ├── OrderSummaryPanel.jsx
│   │   │   └── StepIndicator.jsx
│   │   │
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── CategoryList.jsx
│   │       ├── Cart.jsx
│   │       ├── CheckoutPage.jsx
│   │       ├── OrderSuccessPage.jsx
│   │       ├── About.jsx
│   │       └── Contact.jsx
│   │
│   ├── features/
│   │   └── cartSlice.js
│   │
│   ├── graphql/
│   │   ├── catalog.js
│   │   ├── cart.js
│   │   └── checkout.js
│   │
│   ├── hooks/
│   │   └── useCart.js
│   │
│   ├── services/
│   │   ├── baseApi.js
│   │   ├── catalogApi.js
│   │   ├── cartApi.js
│   │   └── checkoutApi.js
│   │
│   ├── utils/
│   │   └── gqlClient.js
│   │
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   │
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/jaimin30j/headless-react-magento.git
```

Navigate to the project:

```bash
cd headless-react-magento
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## 🔗 Magento GraphQL Integration

The application communicates directly with Magento using GraphQL APIs.

Example Query:

```graphql
query GetCategoryProducts($categoryId: String!, $pageSize: Int!, $currentPage: Int!) {
  products(
    filter: { category_id: { eq: $categoryId } }
    pageSize: $pageSize
    currentPage: $currentPage
  ) {
    total_count
    items {
      id
      sku
      name
      url_key
      stock_status
      price_range {
        minimum_price {
          final_price {
            value
            currency
          }
        }
      }
      small_image {
        url
        label
      }
    }
  }
}
```

---

## 🧠 Key Concepts Implemented

### React

* Functional Components
* Props
* Hooks
* Custom Hooks
* Component Composition
* React Router

### Redux Toolkit

* createSlice
* createAsyncThunk
* Global State Management
* Cart Management
* Product State Management

### Magento GraphQL

* Product Queries
* Product Details Queries
* Cart Operations
* Checkout & Order Success
* Dynamic Data Fetching

---

## 🎯 What This Project Demonstrates

This project highlights my experience as a:

* Adobe Commerce (Magento 2) Developer
* Headless Commerce Developer
* React.js Developer
* GraphQL API Integrator
* Frontend Engineer

It showcases the implementation of a modern eCommerce storefront using Magento as the backend and React as the frontend presentation layer.

---

## 👨‍💻 Author

**Jaimin Patel**

Senior Magento / Adobe Commerce Developer

* Magento 2 Development
* Hyvä Themes
* Headless Commerce
* GraphQL APIs
* React.js Development
* Performance Optimization

GitHub:
https://github.com/jaimin30j

LinkedIn:
https://www.linkedin.com/in/jaimin-patel-82405265/

---

## ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
