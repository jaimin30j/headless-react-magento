import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartId, clearCartId } from '../../features/cartSlice'
import { useCart } from '../../hooks/useCart'
import StepIndicator from '../checkout/StepIndicator'
import ContactStep from '../checkout/ContactStep'
import ShippingStep from '../checkout/ShippingStep'
import PaymentStep from '../checkout/PaymentStep'


export default function CheckoutPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cartId = useSelector(selectCartId)
    const { items } = useCart()
    const [step, setStep] = useState(0) // 0=contact 1=shipping 2=payment
    const [orderPlaced, setOrderPlaced] = useState(false)

    // Guard — only redirect if order not just placed
    if (!orderPlaced && !cartId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">
                    Your cart is empty.{' '}
                    <a href="/" className="text-gray-900 underline">Shop now</a>
                </p>
            </div>
        )
    }

    const handleContactDone = () => setStep(1)
    const handleShippingDone = () => setStep(2)

    // update handleOrderPlaced:
    const handleOrderPlaced = (orderNumber) => {
        setOrderPlaced(true)   // disables the guard
        // Navigate first, OrderSuccessPage will clear the cart on mount
        navigate(`/order-success/${orderNumber}`, { replace: true })
    }

    // guard only fires when not in success flow
    if (!orderPlaced && (!cartId || !items.length)) {
        return <Navigate to="/cart" replace />
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-xl mx-auto">

                {/* Logo / back to cart */}
                <div className="flex items-center justify-between mb-8">
                    <a href="/" className="text-xl font-bold text-gray-900">Store</a>
                    {!orderPlaced && (
                        <a href="/cart"
                            className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                            ← Back to cart
                        </a>
                    )}
                </div>

                <StepIndicator current={step} />

                {/* Step title */}
                <h1 className="text-xl font-semibold text-gray-900 mb-6">
                    {step === 0 && 'Contact information'}
                    {step === 1 && 'Shipping'}
                    {step === 2 && 'Payment'}
                </h1>

                {/* Step panels */}
                <div className="bg-white rounded-2xl border border-gray-300 p-6 shadow-sm">
                    {step === 0 && (
                        <ContactStep cartId={cartId} onDone={handleContactDone} />
                    )}
                    {step === 1 && (
                        <ShippingStep cartId={cartId} onDone={handleShippingDone} />
                    )}
                    {step === 2 && (
                        <PaymentStep onDone={handleOrderPlaced} />
                    )}
                </div>

                {/* Step back links */}
                {step > 0 && !orderPlaced && (
                    <button onClick={() => setStep(step - 1)}
                        className="mt-4 text-sm text-gray-400 hover:text-gray-700
                                   transition-colors w-full text-center">
                        ← Back to {step === 1 ? 'contact' : 'shipping'}
                    </button>
                )}

            </div>
        </div>
    )
}