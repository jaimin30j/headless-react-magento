import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router'
import { Toaster } from 'react-hot-toast'

export default function MainLayout() {
    return (
        <div>
            <Header />

            <Outlet />

            <Footer />
            <Toaster position="top-right" />
        </div>
    )
}
