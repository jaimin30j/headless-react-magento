import React, { useState } from 'react'
import { useCart } from '../../hooks/useCart';

export default function ProductCard({ product }) {
    const { addItem } = useCart()
    const [localAdding, setLocalAdding] = useState(false)

    const handleAdd = async () => {
        setLocalAdding(true)
        await addItem(product.sku, 1)
        setLocalAdding(false)
    }
    return (
        <div className="w-full max-w-sm bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs">
            <a>
                <img
                    className="rounded-base mb-6"
                    src={product?.small_image?.url}
                    alt={product?.name}
                />
            </a>
            <div>
                <a>
                    <h5 className="text-xl text-heading font-semibold tracking-tight">
                        {product?.name}
                    </h5>
                </a>
                <div className="flex flex-wrap gap-3 items-center justify-between mt-6 md:flex-nowrap md:gap-0">
                    <span className="text-3xl font-extrabold text-heading">${product?.price_range?.minimum_price?.final_price?.value}</span>
                    <button
                        onClick={() => handleAdd(product.sku, 1)}
                        type="button"
                        className="inline-flex items-center cursor-pointer text-black bg-brand hover:bg-brand-strong box-border border focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
                    >
                        <svg
                            className="w-4 h-4 me-1.5"
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
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                            />
                        </svg>
                        {localAdding ? 'Adding...' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </div>
    )
}
