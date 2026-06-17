// src/components/checkout/ShippingStep.jsx
import { useState } from 'react'
import { useSetShippingAddressMutation, useSetShippingMethodMutation, useSetBillingAddressMutation } from '../../services/checkoutApi'
import toast from 'react-hot-toast'

const BLANK = {
    firstname: '', lastname: '', street: ['', ''],
    city: '', region: '', region_code: '',
    postcode: '', country_code: 'AE', telephone: '',
    save_in_address_book: false,
}

function Field({ label, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            {children}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    )
}

const input = `w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
               focus:outline-none focus:ring-2 focus:ring-gray-900/20
               focus:border-gray-400 transition-all`

export default function ShippingStep({ cartId, onDone }) {
    const [addr, setAddr] = useState(BLANK)
    const [sameAsShipping, setSame] = useState(true)
    const [availableMethods, setMethods] = useState([])
    const [selectedMethod, setSelected] = useState(null)
    const [showMethods, setShowMethods] = useState(false)
    const [errors, setErrors] = useState({})

    const [setShippingAddress, { isLoading: l1 }] = useSetShippingAddressMutation()
    const [setShippingMethod, { isLoading: l2 }] = useSetShippingMethodMutation()
    const [setBillingAddress, { isLoading: l3 }] = useSetBillingAddressMutation()

    const set = (key, val) => setAddr((a) => ({ ...a, [key]: val }))
    const setStreet = (i, val) => setAddr((a) => {
        const s = [...a.street]; s[i] = val; return { ...a, street: s }
    })

    const validate = () => {
        const e = {}
        if (!addr.firstname.trim()) e.firstname = 'Required'
        if (!addr.lastname.trim()) e.lastname = 'Required'
        if (!addr.street[0].trim()) e.street = 'Required'
        if (!addr.city.trim()) e.city = 'Required'
        if (!addr.postcode.trim()) e.postcode = 'Required'
        if (!addr.telephone.trim()) e.telephone = 'Required'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    // Step A — submit address → get shipping methods
    const handleAddressSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        console.log(addr);
        const res = await setShippingAddress({ cartId, address: addr })
        if (res.error) return toast.error('Failed to save address')

        const methods = res.data
            ?.setShippingAddressesOnCart
            ?.cart?.shipping_addresses?.[0]
            ?.available_shipping_methods || []

        const available = methods.filter((m) => m.available)
        if (!available.length) return toast.error('No shipping methods available')

        setMethods(available)
        setSelected(available[0])   // pre-select first
        setShowMethods(true)
    }

    // Step B — confirm method → set billing → done
    // Step B — confirm method → set billing → done
    const handleMethodConfirm = async () => {
        if (!selectedMethod) return toast.error('Select a shipping method')

        // Run sequentially not parallel — easier to debug which one fails
        const sm = await setShippingMethod({
            cartId,
            carrierCode: selectedMethod.carrier_code,
            methodCode: selectedMethod.method_code,
        })
        if (sm.error) return toast.error('Failed to set shipping method')

        const bl = await setBillingAddress({
            cartId,
            sameAsShipping,
            // never pass undefined — pass null and handle in the mutation
            address: sameAsShipping ? null : addr,
        })
        if (bl.error) return toast.error('Failed to set billing address')

        onDone({ address: addr, method: selectedMethod })
    }

    const fmt = (p) => p
        ? new Intl.NumberFormat('en-AE', { style: 'currency', currency: p.currency }).format(p.value)
        : 'Free'

    return (
        <div className="space-y-6">
            {/* ── Address form ──────────────────────────────────────────── */}
            {!showMethods && (
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="First name" error={errors.firstname}>
                            <input className={input} value={addr.firstname}
                                onChange={(e) => set('firstname', e.target.value)} />
                        </Field>
                        <Field label="Last name" error={errors.lastname}>
                            <input className={input} value={addr.lastname}
                                onChange={(e) => set('lastname', e.target.value)} />
                        </Field>
                    </div>

                    <Field label="Address" error={errors.street}>
                        <input className={`${input} mb-2`} placeholder="Street address"
                            value={addr.street[0]}
                            onChange={(e) => setStreet(0, e.target.value)} />
                        <input className={input} placeholder="Apt, suite, etc. (optional)"
                            value={addr.street[1]}
                            onChange={(e) => setStreet(1, e.target.value)} />
                    </Field>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="City" error={errors.city}>
                            <input className={input} value={addr.city}
                                onChange={(e) => set('city', e.target.value)} />
                        </Field>
                        <Field label="Postcode" error={errors.postcode}>
                            <input className={input} value={addr.postcode}
                                onChange={(e) => set('postcode', e.target.value)} />
                        </Field>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Country">
                            <select className={input} value={addr.country_code}
                                onChange={(e) => set('country_code', e.target.value)}>
                                <option value="AE">United Arab Emirates</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="IN">India</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                            </select>
                        </Field>
                        <Field label="Phone" error={errors.telephone}>
                            <input className={input} placeholder="+971..." value={addr.telephone}
                                onChange={(e) => set('telephone', e.target.value)} />
                        </Field>
                    </div>

                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                        <input type="checkbox" checked={sameAsShipping}
                            onChange={(e) => setSame(e.target.checked)}
                            className="rounded accent-gray-900" />
                        Billing address same as shipping
                    </label>

                    <button type="submit" disabled={l1}
                        className="cursor-pointer w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50
                       text-white font-semibold py-3 rounded-xl transition-colors">
                        {l1 ? 'Saving...' : 'Continue to Delivery'}
                    </button>
                </form>
            )}

            {/* ── Shipping methods ──────────────────────────────────────── */}
            {showMethods && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Delivery method</h3>
                        <button onClick={() => setShowMethods(false)}
                            className="text-sm text-gray-400 hover:text-gray-700">
                            ← Edit address
                        </button>
                    </div>

                    {/* Address summary */}
                    <div className="bg-gray-50 rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-600">
                        {addr.firstname} {addr.lastname} · {addr.street[0]}, {addr.city} · {addr.telephone}
                    </div>

                    {/* Method list */}
                    <div className="space-y-2">
                        {availableMethods.map((m) => (
                            <label key={`${m.carrier_code}_${m.method_code}`}
                                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer
                            transition-all ${selectedMethod?.method_code === m.method_code
                                        ? 'border-gray-900 bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'}`}>
                                <input type="radio" name="shipping_method"
                                    checked={selectedMethod?.method_code === m.method_code}
                                    onChange={() => setSelected(m)}
                                    className="accent-gray-900" />
                                <div className="flex-1">
                                    <p className="font-medium text-sm text-gray-900">
                                        {m.carrier_title}
                                    </p>
                                    <p className="text-xs text-gray-400">{m.method_title}</p>
                                </div>
                                <span className="font-semibold text-sm text-gray-900">
                                    {fmt(m.amount)}
                                </span>
                            </label>
                        ))}
                    </div>

                    <button onClick={handleMethodConfirm} disabled={l2 || l3}
                        className="cursor-pointer w-full bg-gray-900 hover:bg-gray-700 disabled:opacity-50
                       text-white font-semibold py-3 rounded-xl transition-colors">
                        {(l2 || l3) ? 'Saving...' : 'Continue to Payment'}
                    </button>
                </div>
            )}
        </div>
    )
}