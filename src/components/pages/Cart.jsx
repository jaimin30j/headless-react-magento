import { Link } from 'react-router'
import { useCart } from '../../hooks/useCart'
import { clearCartId } from '../../features/cartSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const fmt = (p) =>
    p ? new Intl.NumberFormat('en-AE', {
        style: 'currency', currency: p.currency
    }).format(p.value) : '—'

function QtyControl({ item, onUpdate, onRemove, isUpdating }) {
    return (
        <div className="flex items-center gap-2 mt-2">
            <button
                onClick={() => onUpdate(item.uid, item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
                className="w-7 h-7 rounded-lg border border-gray-300 text-gray-600
                   hover:bg-gray-100 disabled:opacity-30 flex items-center
                   justify-center text-lg leading-none transition-colors"
            >−</button>

            <span className="w-8 text-center text-sm font-semibold text-gray-900">
                {item.quantity}
            </span>

            <button
                onClick={() => onUpdate(item.uid, item.quantity + 1)}
                disabled={isUpdating}
                className="w-7 h-7 rounded-lg border border-gray-300 text-gray-600
                   hover:bg-gray-100 disabled:opacity-30 flex items-center
                   justify-center text-lg leading-none transition-colors"
            >+</button>

            <button
                onClick={() => onRemove(item.uid)}
                className="cursor-pointer ml-2 text-xs text-red-400 hover:text-red-600 transition-colors"
            >
                Remove
            </button>
        </div>
    )
}

export default function Cart() {
    const {
        cart, items, itemCount,
        subtotal, grandTotal,
        cartLoading, isUpdating, isRemoving,
        updateQty, removeOne, emptyCart, isError
    } = useCart()

    const dispatch = useDispatch();

    // If Magento says cart is inactive/expired — clear it
    useEffect(() => {
        if (isError) {
            dispatch(clearCartId())
        }
    }, [isError, dispatch])

    // ── loading ──────────────────────────────────────────────────────
    if (cartLoading) return (
        <div className="max-w-screen-xl mx-auto px-4 py-12 space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-4 bg-white border border-gray-100
                                rounded-xl p-4 animate-pulse">
                    <div className="w-30 h-30 bg-gray-100 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                        <div className="h-3 bg-gray-100 rounded w-1/3" />
                        <div className="h-8 bg-gray-100 rounded w-1/4 mt-3" />
                    </div>
                    <div className="h-5 bg-gray-100 rounded w-16" />
                </div>
            ))}
        </div>
    )

    // ── empty ─────────────────────────────────────────────────────────
    if (!items.length) return (
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Your cart is empty
            </h1>
            <p className="text-gray-400 mb-8">
                Add some products to get started
            </p>
            <Link
                to="/"
                className="inline-block bg-gray-900 text-white px-8 py-3
                   rounded-xl font-medium hover:bg-gray-700 transition-colors"
            >
                Continue Shopping
            </Link>
        </div>
    )

    // ── cart ──────────────────────────────────────────────────────────
    return (
        <div className="max-w-screen-xl mx-auto px-4 py-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Shopping Cart
                    <span className="ml-2 text-base font-normal text-gray-400">
                        ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                    </span>
                </h1>
                <button
                    onClick={emptyCart}
                    className="text-sm text-red-400 hover:text-red-600 transition-colors"
                >
                    Clear cart
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* ── Item list ───────────────────────────────────────────── */}
                <div className="lg:col-span-2 space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.uid}
                            className={`flex items-center flex-wrap gap-4 bg-white border border-gray-100 rounded-xl
                          p-4 transition-opacity
                          ${(isUpdating || isRemoving) ? 'opacity-60' : ''}`}
                        >
                            {/* Image */}
                            <Link
                                to={`/product/${item.product.url_key}`}
                                className="shrink-0"
                            >
                                <img
                                    src={item.product.small_image?.url}
                                    alt={item.product.small_image?.label || item.product.name}
                                    className="w-30 h-30 object-cover rounded-lg bg-gray-50"
                                />
                            </Link>

                            {/* Details */}
                            <div className="flex flex-1  flex-wrap min-w-0 items-center justify-between">
                                <Link to={`/product/${item.product.url_key}`}>
                                    <p className="font-medium text-gray-900 truncate hover:text-brand
                                transition-colors">
                                        {item.product.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5 font-mono">
                                        {item.product.sku}
                                    </p>
                                </Link>

                                <QtyControl
                                    item={item}
                                    onUpdate={updateQty}
                                    onRemove={removeOne}
                                    isUpdating={isUpdating || isRemoving}
                                />
                            </div>

                            {/* Row total */}
                            <div className="shrink-0 text-right">
                                <p className="font-semibold text-gray-900">
                                    {fmt(item.prices?.row_total)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Order summary ────────────────────────────────────────── */}
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-6 h-fit space-y-3 text-sm">
                    <h2 className="font-semibold text-gray-900 text-base mb-4">
                        Order Summary
                    </h2>

                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal ({itemCount} items)</span>
                        <span>{fmt(subtotal)}</span>
                    </div>

                    {cart?.prices?.applied_taxes?.map((tax, i) => (
                        <div key={i} className="flex justify-between text-gray-600">
                            <span>{tax.label}</span>
                            <span>{fmt(tax.amount)}</span>
                        </div>
                    ))}

                    {cart?.prices?.discounts?.map((d, i) => (
                        <div key={i} className="flex justify-between text-green-600">
                            <span>{d.label}</span>
                            <span>−{fmt(d.amount)}</span>
                        </div>
                    ))}

                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-gray-400">Calculated at checkout</span>
                    </div>

                    <div className="border-t border-gray-300 pt-3 flex justify-between
                          font-semibold text-gray-900 text-base">
                        <span>Total</span>
                        <span>{fmt(grandTotal)}</span>
                    </div>

                    {cart?.applied_coupons?.length > 0 && (
                        <div className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg">
                            Coupon <strong>{cart.applied_coupons[0].code}</strong> applied
                        </div>
                    )}

                    <Link
                        to="/checkout"
                        className="block w-full text-center bg-gray-900 hover:bg-gray-700
                       text-white font-semibold py-3 rounded-xl transition-colors mt-2"
                    >
                        Proceed to Checkout
                    </Link>

                    <Link
                        to="/"
                        className="block text-center text-gray-400 hover:text-gray-600
                       text-xs transition-colors"
                    >
                        ← Continue Shopping
                    </Link>
                </div>

            </div>
        </div>
    )
}