import { createRoot } from 'react-dom/client'
import { lazy } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Home from './components/pages/Home.jsx'
import MainLayout from './components/common/MainLayout.jsx'
import { store } from './app/store.js'
const Cart = lazy(() => import('./components/pages/Cart.jsx'));
const About = lazy(() => import('./components/pages/About.jsx'));
const Contact = lazy(() => import('./components/pages/Contact.jsx'));
const CategoryList = lazy(() => import('./components/pages/CategoryList.jsx'));
const CheckoutPage = lazy(() => import('./components/pages/CheckoutPage.jsx'));
const OrderSuccessPage = lazy(() => import('./components/pages/OrderSuccessPage.jsx'));
const PageNotFound = lazy(() => import('./components/common/PageNotFound.jsx'));

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<CategoryList />} />
          <Route path="/shop/id/:id" element={<CategoryList />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success/:orderNumber" element={<OrderSuccessPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
