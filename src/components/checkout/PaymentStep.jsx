import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCartId } from '../../features/cartSlice'
import {
    useGetPaymentMethodsQuery,
    useSetPaymentMethodMutation,
    usePlaceOrderMutation,
} from '../../services/checkoutApi'
import toast from 'react-hot-toast'

const fmt = (p) => p
    ? new Intl.NumberFormat('en-AE', { style: 'currency', currency: p.currency }).format(p.value)
    : '—'

export default function PaymentStep({ onDone }) {
    const cartId = useSelector(selectCartId)
    const [paymentCode, setPaymentCode] = useState('')

    const { data, isLoading: loadingMethods } = useGetPaymentMethodsQuery(cartId)
    const [setPaymentMethod, { isLoading: settingPayment }] = useSetPaymentMethodMutation()
    const [placeOrder, { isLoading: placingOrder }] = usePlaceOrderMutation()

    const cart = data?.cart
    const methods = cart?.available_payment_methods || []
    const isLoading = settingPayment || placingOrder

    const handlePlaceOrder = async () => {
        if (!paymentCode) return toast.error('Select a payment method')

        const pm = await setPaymentMethod({ cartId, code: paymentCode })
        if (pm.error) return toast.error('Failed to set payment method')

        const res = await placeOrder({ cartId })
        const apiErrors = res.data?.placeOrder?.errors
        if (res.error || apiErrors?.length) {
            return toast.error(apiErrors?.[0]?.message || 'Order failed, please try again')
        }

        onDone(res.data.placeOrder.order.order_number)
    }

    if (loadingMethods) return (
        <div className="space-y-3 animate-pulse">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded-xl" />
            ))}
        </div>
    )

    return (
        <div className="space-y-6">

            {/* Payment methods */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Payment method</h3>
                <div className="space-y-2">
                    {methods.map((m) => (
                        <label key={m.code}
                            className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer
                          transition-all ${paymentCode === m.code
                                    ? 'border-gray-900 bg-gray-50'
                                    : 'border-gray-200 hover:border-gray-300'}`}>
                            <input type="radio" name="payment_method"
                                checked={paymentCode === m.code}
                                onChange={() => setPaymentCode(m.code)}
                                className="accent-gray-900" />
                            <div className="flex-1">
                                <p className="font-medium text-sm text-gray-900">{m.title}</p>
                                {m.code === 'checkmo' && (
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Make check payable to store owner
                                    </p>
                                )}
                                {m.code === 'cashondelivery' && (
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Pay when your order arrives
                                    </p>
                                )}
                                {m.code === 'banktransfer' && (
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Bank transfer details after order
                                    </p>
                                )}
                            </div>
                        </label>
                    ))}
                    {!methods.length && (
                        <p className="text-sm text-red-500">
                            No payment methods available. Check Magento admin.
                        </p>
                    )}
                </div>
            </div>

            {/* Order summary */}
            {cart && (
                <div className="bg-gray-50 border border-gray-300 rounded-xl p-5 space-y-3 text-sm">
                    <h3 className="font-semibold text-gray-900 mb-3">Order summary</h3>

                    {cart.items?.map((item) => (
                        <div key={item.uid} className="flex items-center gap-3">
                            <img src={item.product.small_image?.url}
                                alt={item.product.name}
                                className="w-10 h-10 object-cover rounded-lg bg-gray-100 shrink-0" />
                            <span className="flex-1 text-gray-600 text-xs line-clamp-1">
                                {item.product.name}
                            </span>
                            <span className="text-gray-900 font-medium shrink-0">
                                {fmt(item.prices?.row_total)}
                            </span>
                        </div>
                    ))}

                    <div className="border-t border-gray-200 pt-3 space-y-1.5">
                        <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span>{fmt(cart.prices?.subtotal_excluding_tax)}</span>
                        </div>
                        {cart.shipping_addresses?.[0]?.selected_shipping_method && (
                            <div className="flex justify-between text-gray-500">
                                <span>
                                    {cart.shipping_addresses[0].selected_shipping_method.carrier_title}
                                </span>
                                <span>
                                    {fmt(cart.shipping_addresses[0].selected_shipping_method.amount)}
                                </span>
                            </div>
                        )}
                        {cart.prices?.applied_taxes?.map((t, i) => (
                            <div key={i} className="flex justify-between text-gray-500">
                                <span>{t.label}</span>
                                <span>{fmt(t.amount)}</span>
                            </div>
                        ))}
                        {cart.prices?.discounts?.map((d, i) => (
                            <div key={i} className="flex justify-between text-green-600">
                                <span>{d.label}</span>
                                <span>−{fmt(d.amount)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-semibold text-gray-900
                            text-base pt-1 border-t border-gray-200">
                            <span>Total</span>
                            <span>{fmt(cart.prices?.grand_total)}</span>
                        </div>
                    </div>
                </div>
            )}

            <button
                onClick={handlePlaceOrder}
                disabled={isLoading || !paymentCode || !methods.length}
                className="cursor-pointer w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50
                   disabled:cursor-not-allowed text-white font-semibold py-4
                   rounded-xl transition-colors text-base"
            >
                {placingOrder ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10"
                                stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Placing order...
                    </span>
                ) : (
                    `Place order — ${fmt(cart?.prices?.grand_total)}`
                )}
            </button>

            <p className="text-center text-xs text-gray-400">
                By placing your order you agree to our terms and conditions
            </p>
        </div>
    )
}