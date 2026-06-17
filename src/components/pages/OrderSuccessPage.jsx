import { useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { clearCartId } from '../../features/cartSlice'

export default function OrderSuccessPage() {
    const { orderNumber } = useParams()
    const dispatch = useDispatch()

    // Clear cart here — only runs when success page actually mounts
    useEffect(() => {
        dispatch(clearCartId())
    }, [dispatch])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl border border-gray-300
                      shadow-sm p-10 text-center">

                {/* Check icon */}
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center
                        justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-500" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M5 13l4 4L19 7" />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order placed!</h1>
                <p className="text-gray-500 mb-1">Thank you for your purchase.</p>

                {orderNumber && (
                    <p className="text-sm font-mono text-black bg-gray-100 rounded-lg
                        px-4 py-2 inline-block mt-2 mb-8">
                        Order #{orderNumber}
                    </p>
                )}

                <div className="space-y-3">
                    <Link to="/"
                        className="block w-full bg-gray-900 hover:bg-gray-700 text-white
                       font-semibold py-3 rounded-xl transition-colors">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}