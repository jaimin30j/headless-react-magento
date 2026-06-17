import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useCart } from '../../hooks/useCart'

export default function Header() {
    const [navOpen, setNavOpen] = useState(false);
    const { itemCount } = useCart();
    const itemQty = itemCount > 0 ? itemCount : 0;
    return (
        <nav className="bg-neutral-primary w-full z-20 top-0 start-0 border-b border-default">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <svg
                        className="w-[48px] h-[48px] text-gray-800 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth="1.4"
                            d="M8.737 8.737a21.49 21.49 0 0 1 3.308-2.724m0 0c3.063-2.026 5.99-2.641 7.331-1.3 1.827 1.828.026 6.591-4.023 10.64-4.049 4.049-8.812 5.85-10.64 4.023-1.33-1.33-.736-4.218 1.249-7.253m6.083-6.11c-3.063-2.026-5.99-2.641-7.331-1.3-1.827 1.828-.026 6.591 4.023 10.64m3.308-9.34a21.497 21.497 0 0 1 3.308 2.724m2.775 3.386c1.985 3.035 2.579 5.923 1.248 7.253-1.336 1.337-4.245.732-7.295-1.275M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
                        />
                    </svg>

                    <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
                        E-commerce
                    </span>
                </Link>

                <button
                    onClick={() => setNavOpen(!navOpen)}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
                    aria-controls="navbar-default"
                    aria-expanded={navOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeWidth={2}
                            d="M5 7h14M5 12h14M5 17h14"
                        />
                    </svg>
                </button>
                <div className={`${navOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                        <li>
                            <NavLink to="/"
                                className={({ isActive }) =>
                                    `block py-2 px-3 md:p-0 ${isActive
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-blue-500"
                                    }`
                                }>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/shop"
                                className={({ isActive }) =>
                                    `block py-2 px-3 md:p-0 ${isActive
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-blue-500"
                                    }`
                                }>
                                Shop
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about"
                                className={({ isActive }) =>
                                    `block py-2 px-3 md:p-0 ${isActive
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-blue-500"
                                    }`
                                }>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact"
                                className={({ isActive }) =>
                                    `block py-2 px-3 md:p-0 ${isActive
                                        ? "text-blue-600"
                                        : "text-gray-700 hover:text-blue-500"
                                    }`
                                }>
                                Contact
                            </NavLink>
                        </li>
                        <li>
                            <Link to="/cart" className="relative block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">
                                {/* Shopping Cart SVG */}
                                <svg
                                    xmlns="http://w3.org"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                                {/* Badge Notification Count */}
                                { }
                                <span className="absolute top-1 left-[16px] md:top-0 md:right-auto inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-blue-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                                    {itemQty}
                                </span>
                            </Link>

                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
