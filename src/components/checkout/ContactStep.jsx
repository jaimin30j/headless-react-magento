import { useState } from 'react'
import { useSetGuestEmailMutation } from '../../services/checkoutApi'
import toast from 'react-hot-toast'

export default function ContactStep({ cartId, onDone }) {
    const [email, setEmail] = useState('')
    const [setGuestEmail, { isLoading }] = useSetGuestEmailMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) return toast.error('Email is required')
        if (!/\S+@\S+\.\S+/.test(email)) return toast.error('Enter a valid email')

        const res = await setGuestEmail({ cartId, email })
        if (res.error) return toast.error('Failed to save email, try again')
        onDone({ email })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                     focus:outline-none focus:ring-2 focus:ring-gray-900/20
                     focus:border-gray-400 transition-all"
                />
                <p className="text-xs text-gray-400 mt-1">
                    Order confirmation will be sent to this address
                </p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50
                   text-white font-semibold py-3 rounded-xl transition-colors"
            >
                {isLoading ? 'Saving...' : 'Continue to Shipping'}
            </button>
        </form>
    )
}